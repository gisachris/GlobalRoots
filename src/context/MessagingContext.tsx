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
      // Prevent duplicate messages
      const messageExists = currentMessages.some(m => 
        m.id === action.payload.message.id || 
        (m.content === action.payload.message.content && 
         m.sender_id === action.payload.message.sender_id &&
         Math.abs(new Date(m.created_at).getTime() - new Date(action.payload.message.created_at).getTime()) < 1000)
      );
      
      if (messageExists) return state;
      
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.key]: [...currentMessages, action.payload.message],
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
  loadMessages: (circleId?: string, conversationId?: string) => Promise<void>;
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
    
    try {
      messagesSubscription = supabase
        .channel(`messages-${user.id}`)
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
        .subscribe();
    } catch (error) {
      console.warn('Real-time subscription failed, continuing without it:', error);
    }

    return () => {
      try {
        messagesSubscription?.unsubscribe();
      } catch (error) {
        console.warn('Failed to unsubscribe:', error);
      }
    };
  }, [user]);

  const sendMessage = useCallback(async (content: string, circleId?: string, conversationId?: string) => {
    if (!user || !content.trim()) return;

    // Optimistically add message to UI immediately
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
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
    
    const key = circleId || conversationId || '';
    dispatch({ type: 'ADD_MESSAGE', payload: { key, message: optimisticMessage } });
    
    // Send to database in background
    try {
      supabase
        .from('messages')
        .insert([{
          sender_id: user.id,
          content: content.trim(),
          circle_id: circleId || null,
          conversation_id: conversationId || null,
        }]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }, [user]);

  const loadMessages = useCallback(async (circleId?: string, conversationId?: string) => {
    if (!user) return;
    
    const key = circleId || conversationId || '';
    if (state.messages[key]?.length > 0) return;

    try {
      let query = supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(50);

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