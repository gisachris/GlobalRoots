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
  sender_name?: string;
  sender_role?: 'mentor' | 'youth';
  sender_avatar?: string;
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
  isConnected: boolean;
}

type MessagingAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_MESSAGES'; payload: { key: string; messages: Message[] } }
  | { type: 'ADD_MESSAGE'; payload: { key: string; message: Message } }
  | { type: 'SET_CONVERSATIONS'; payload: Conversation[] }
  | { type: 'SET_CONNECTED'; payload: boolean };

const initialState: MessagingState = {
  messages: {},
  conversations: [],
  loading: false,
  error: null,
  isConnected: false,
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

    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.payload };
    case 'SET_CONNECTED':
      return { ...state, isConnected: action.payload };
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
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    let reconnectTimeout: NodeJS.Timeout;

    const connectRealtime = () => {
      messagesSubscription = supabase
        .channel(`messages-${Date.now()}`) // Unique channel name
        .on('postgres_changes', 
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'messages'
          },
          async (payload) => {
            const message = payload.new as Message;
            const key = message.circle_id || message.conversation_id || '';
            
            // Only add if not from current user (avoid duplicates)
            if (message.sender_id !== user.id) {
              // Fetch sender info using function
              const { data: profileData } = await supabase
                .rpc('get_user_profile', { user_id: message.sender_id });
              
              const messageWithSender = {
                ...message,
                sender_name: profileData?.full_name || 'Unknown User',
                sender_role: profileData?.role || 'youth',
                sender_avatar: profileData?.avatar_url
              };
              
              dispatch({ type: 'ADD_MESSAGE', payload: { key, message: messageWithSender } });
              
              // Show notification
              if ('Notification' in window && Notification.permission === 'granted') {
                new Notification(`New message from ${messageWithSender.sender_name}`, {
                  body: message.content,
                  icon: '/favicon.ico'
                });
              }
            }
          }
        )
        .subscribe((status) => {
          console.log('Realtime status:', status);
          
          if (status === 'SUBSCRIBED') {
            reconnectAttempts = 0; // Reset on successful connection
            dispatch({ type: 'SET_CONNECTED', payload: true });
          } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
            dispatch({ type: 'SET_CONNECTED', payload: false });
            // Auto-reconnect with exponential backoff
            if (reconnectAttempts < maxReconnectAttempts) {
              const delay = Math.pow(2, reconnectAttempts) * 1000; // 1s, 2s, 4s, 8s, 16s
              console.log(`Reconnecting in ${delay}ms (attempt ${reconnectAttempts + 1})`);
              
              reconnectTimeout = setTimeout(() => {
                reconnectAttempts++;
                messagesSubscription?.unsubscribe();
                connectRealtime();
              }, delay);
            } else {
              console.error('Max reconnection attempts reached');
              dispatch({ type: 'SET_ERROR', payload: 'Connection lost. Please refresh the page.' });
            }
          }
        });
    };

    // Initial connection
    connectRealtime();

    // Reconnect on window focus (user returns to tab)
    const handleFocus = () => {
      if (messagesSubscription?.state !== 'joined') {
        messagesSubscription?.unsubscribe();
        reconnectAttempts = 0;
        connectRealtime();
      }
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      messagesSubscription?.unsubscribe();
    };
  }, [user]);

  const sendMessage = useCallback(async (content: string, circleId?: string, conversationId?: string) => {
    if (!user || !content.trim()) return;

    const key = circleId || conversationId || '';
    
    // Send to database immediately
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          sender_id: user.id,
          content: content.trim(),
          circle_id: circleId || null,
          conversation_id: conversationId || null,
          message_type: 'text'
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Add message to state immediately for sender with user info
      if (data) {
        const messageWithSender = {
          ...data,
          sender_name: user.user_metadata?.full_name || 'You',
          sender_role: user.role || 'youth',
          sender_avatar: user.user_metadata?.avatar_url
        };
        dispatch({ type: 'ADD_MESSAGE', payload: { key, message: messageWithSender } });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to send message' });
    }
  }, [user]);

  const loadMessages = useCallback(async (circleId?: string, conversationId?: string, force = false) => {
    if (!user) return;
    
    const key = circleId || conversationId || '';
    if (!force && state.messages[key]?.length > 0) return;

    try {
      const { data: rawMessages, error } = await supabase
        .from('messages')
        .select('*')
        .eq(circleId ? 'circle_id' : 'conversation_id', circleId || conversationId)
        .order('created_at', { ascending: true })
        .limit(50);
      
      if (error) {
        console.error('Failed to load messages:', error);
        return;
      }
      
      // Fetch user profiles for all messages
      const messagesWithSender = await Promise.all(
        (rawMessages || []).map(async (msg) => {
          const { data: profileData } = await supabase
            .rpc('get_user_profile', { user_id: msg.sender_id });
          
          return {
            ...msg,
            sender_name: profileData?.full_name || 'Unknown User',
            sender_role: profileData?.role || 'youth',
            sender_avatar: profileData?.avatar_url
          };
        })
      );

      dispatch({ type: 'SET_MESSAGES', payload: { key, messages: messagesWithSender } });
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