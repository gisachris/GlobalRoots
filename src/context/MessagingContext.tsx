import React, { createContext, useContext, useReducer, useEffect } from 'react';
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

  useEffect(() => {
    if (!user) return;

    const messagesSubscription = supabase
      .channel('messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const message = payload.new as Message;
          const key = message.circle_id || message.conversation_id || '';
          dispatch({ type: 'ADD_MESSAGE', payload: { key, message } });
        }
      )
      .subscribe();

    return () => {
      messagesSubscription.unsubscribe();
    };
  }, [user]);

  const sendMessage = async (content: string, circleId?: string, conversationId?: string) => {
    if (!user || !content.trim()) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const { error } = await supabase
        .from('messages')
        .insert([{
          sender_id: user.id,
          content: content.trim(),
          circle_id: circleId || null,
          conversation_id: conversationId || null,
        }]);

      if (error) throw error;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadMessages = async (circleId?: string, conversationId?: string) => {
    if (!user) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      let query = supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (circleId) {
        query = query.eq('circle_id', circleId);
      } else if (conversationId) {
        query = query.eq('conversation_id', conversationId);
      }

      const { data, error } = await query;

      if (error) throw error;

      const key = circleId || conversationId || '';
      dispatch({ type: 'SET_MESSAGES', payload: { key, messages: data || [] } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadConversations = async () => {
    if (!user) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .or(`mentor_id.eq.${user.id},mentee_id.eq.${user.id}`)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      dispatch({ type: 'SET_CONVERSATIONS', payload: data || [] });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const createConversation = async (mentorId: string, menteeId: string): Promise<string> => {
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
  };

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