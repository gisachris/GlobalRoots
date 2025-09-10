import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase-client';
import { useAuth } from './AuthContext';

interface Message {
  id: string;
  sender_id: string;
  circle_id?: string;
  conversation_id?: string;
  content: string;
  message_type: 'text' | 'file' | 'image';
  created_at: string;
  failed?: boolean;
  sender?: {
    id: string;
    email: string;
    user_metadata?: { full_name?: string };
  };
}

interface Conversation {
  id: string;
  mentor_id: string;
  mentee_id: string;
  created_at: string;
  last_message?: Message;
  unread_count?: number;
}

interface MessagingState {
  messages: Record<string, Message[]>;
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
}

type MessagingAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_MESSAGES'; payload: { key: string; messages: Message[] } }
  | { type: 'ADD_MESSAGE'; payload: { key: string; message: Message } }
  | { type: 'REPLACE_MESSAGE'; payload: { key: string; tempId: string; message: Message } }
  | { type: 'MARK_MESSAGE_FAILED'; payload: { key: string; tempId: string } }
  | { type: 'SET_CONVERSATIONS'; payload: Conversation[] };

const initialState: MessagingState = {
  messages: {},
  conversations: [],
  loading: false,
  error: null,
};

const messagingReducer = (state: MessagingState, action: MessagingAction): MessagingState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: { ...state.messages, [action.payload.key]: action.payload.messages },
      };
    case 'ADD_MESSAGE':
      const currentMessages = state.messages[action.payload.key] || [];
      // Simple duplicate prevention by ID only
      const messageExists = currentMessages.some(m => m.id === action.payload.message.id);
      
      if (messageExists) return state;
      
      // Sort messages by timestamp to maintain order
      const newMessages = [...currentMessages, action.payload.message]
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.key]: newMessages,
        },
      };
    case 'REPLACE_MESSAGE':
      const messagesForReplace = state.messages[action.payload.key] || [];
      const updatedMessages = messagesForReplace.map(m => 
        m.id === action.payload.tempId ? action.payload.message : m
      );
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.key]: updatedMessages,
        },
      };
    case 'MARK_MESSAGE_FAILED':
      const messagesForFail = state.messages[action.payload.key] || [];
      const failedMessages = messagesForFail.map(m => 
        m.id === action.payload.tempId ? { ...m, failed: true } : m
      );
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.key]: failedMessages,
        },
      };
    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.payload };
    default:
      return state;
  }
};

interface MessagingContextType {
  state: MessagingState;
  sendMessage: (content: string, circleId?: string, conversationId?: string) => Promise<void>;
  loadMessages: (circleId?: string, conversationId?: string, force?: boolean) => Promise<void>;
  loadConversations: () => Promise<void>;
  createConversation: (mentorId: string, menteeId: string) => Promise<string>;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export const MessagingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(messagingReducer, initialState);
  const { user } = useAuth();

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    let messagesSubscription: any;
    let pollInterval: NodeJS.Timeout;
    let isSubscriptionActive = false;
    
    // Setup real-time subscription with retry
    const setupSubscription = () => {
      try {
        messagesSubscription = supabase
          .channel(`messages-${Date.now()}`)
          .on('postgres_changes', 
            { 
              event: 'INSERT', 
              schema: 'public', 
              table: 'messages'
            },
            (payload) => {
              const message = payload.new as Message;
              const key = message.circle_id || message.conversation_id || '';
              
              if (message.sender_id !== user.id && 'Notification' in window && Notification.permission === 'granted') {
                new Notification('New Message', {
                  body: message.content,
                  icon: '/favicon.ico',
                  tag: key
                });
              }
              
              dispatch({ type: 'ADD_MESSAGE', payload: { key, message } });
            }
          )
          .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
              isSubscriptionActive = true;
              if (pollInterval) {
                clearInterval(pollInterval);
              }
            } else if (status === 'CLOSED') {
              isSubscriptionActive = false;
              startPolling();
            }
          });
      } catch (error) {
        console.warn('Real-time subscription failed:', error);
        startPolling();
      }
    };

    // Fallback polling mechanism
    const startPolling = () => {
      if (pollInterval) clearInterval(pollInterval);
      
      pollInterval = setInterval(async () => {
        if (isSubscriptionActive) return;
        
        // Poll for new messages in active chats
        Object.keys(state.messages).forEach(async (key) => {
          try {
            const lastMessage = state.messages[key]?.slice(-1)[0];
            const lastTimestamp = lastMessage?.created_at || new Date(Date.now() - 60000).toISOString();
            
            let query = supabase
              .from('messages')
              .select('*')
              .gt('created_at', lastTimestamp)
              .order('created_at', { ascending: true });
            
            if (key.includes('-')) {
              query = query.eq('conversation_id', key);
            } else {
              query = query.eq('circle_id', key);
            }
            
            const { data } = await query;
            
            data?.forEach(message => {
              dispatch({ type: 'ADD_MESSAGE', payload: { key, message } });
            });
          } catch (error) {
            console.error('Polling failed:', error);
          }
        });
      }, 3000);
    };

    setupSubscription();

    return () => {
      try {
        messagesSubscription?.unsubscribe();
      } catch (error) {
        console.warn('Failed to unsubscribe:', error);
      }
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [user, state.messages]);

  const sendMessage = useCallback(async (content: string, circleId?: string, conversationId?: string) => {
    if (!user || !content.trim()) return;

    const tempId = `temp-${Date.now()}-${Math.random()}`;
    const key = circleId || conversationId || '';
    
    // Optimistically add message to UI immediately
    const optimisticMessage: Message = {
      id: tempId,
      sender_id: user.id,
      content: content.trim(),
      circle_id: circleId || undefined,
      conversation_id: conversationId || undefined,
      message_type: 'text',
      created_at: new Date().toISOString(),
      sender: {
        id: user.id,
        email: user.email || '',
        user_metadata: { full_name: user.user_metadata?.full_name }
      }
    };
    
    dispatch({ type: 'ADD_MESSAGE', payload: { key, message: optimisticMessage } });
    
    // Send to database with proper error handling
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          sender_id: user.id,
          content: content.trim(),
          circle_id: circleId || null,
          conversation_id: conversationId || null,
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Replace optimistic message with real one
      if (data) {
        dispatch({ type: 'REPLACE_MESSAGE', payload: { key, tempId, message: data } });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // Mark message as failed
      dispatch({ type: 'MARK_MESSAGE_FAILED', payload: { key, tempId } });
    }
  }, [user]);

  const loadMessages = useCallback(async (circleId?: string, conversationId?: string, force = false) => {
    if (!user) return;
    
    const key = circleId || conversationId || '';
    if (!force && state.messages[key]?.length > 0) return;

    try {
      let query = supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(100);

      if (circleId) {
        query = query.eq('circle_id', circleId);
      } else if (conversationId) {
        query = query.eq('conversation_id', conversationId);
      }

      const { data } = await query;
      dispatch({ type: 'SET_MESSAGES', payload: { key, messages: data || [] } });
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  }, [user, state.messages]);

  const loadConversations = useCallback(async () => {
    if (!user || state.conversations.length > 0) return;

    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .or(`mentor_id.eq.${user.id},mentee_id.eq.${user.id}`)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      dispatch({ type: 'SET_CONVERSATIONS', payload: data || [] });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    }
  }, [user, state.conversations.length]);

  const createConversation = useCallback(async (mentorId: string, menteeId: string): Promise<string> => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert([{ mentor_id: mentorId, mentee_id: menteeId }])
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      throw error;
    }
  }, []);

  return (
    <MessagingContext.Provider
      value={{
        state,
        sendMessage,
        loadMessages,
        loadConversations,
        createConversation,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (context === undefined) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
};