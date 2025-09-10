import { useEffect, useRef, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase-client';
import { useAuth } from '../context/AuthContext';

interface Message {
  id: string;
  sender_id: string;
  circle_id?: string;
  conversation_id?: string;
  content: string;
  message_type: 'text' | 'file' | 'image';
  created_at: string;
  failed?: boolean;
}

export const useReliableMessaging = (chatId: string) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const lastMessageTime = useRef<string>(new Date().toISOString());
  const pollInterval = useRef<NodeJS.Timeout>();
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  // Layer 1: Aggressive Polling (Primary)
  const startPolling = useCallback(() => {
    if (pollInterval.current) clearInterval(pollInterval.current);
    
    const poll = async () => {
      try {
        // Only support circles for now
        if (chatId.includes('-')) {
          return; // Skip conversations
        }
        
        const query = supabase
          .from('messages')
          .select('id, sender_id, content, circle_id, conversation_id, message_type, created_at')
          .eq('circle_id', chatId)
          .gt('created_at', lastMessageTime.current)
          .order('created_at', { ascending: true });

        const { data, error } = await query;
        
        if (!error && data && data.length > 0) {
          setMessages(prev => {
            const newMessages = [...prev];
            data.forEach(msg => {
              if (!newMessages.find(m => m.id === msg.id)) {
                newMessages.push(msg);
              }
            });
            return newMessages.sort((a, b) => 
              new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            );
          });
          
          lastMessageTime.current = data[data.length - 1].created_at;
        }
        
        setIsConnected(true);
        reconnectAttempts.current = 0;
      } catch (error) {
        console.error('Polling failed:', error);
        setIsConnected(false);
        
        // Exponential backoff
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          setTimeout(() => startPolling(), Math.pow(2, reconnectAttempts.current) * 1000);
        }
      }
    };

    poll(); // Initial poll
    pollInterval.current = setInterval(poll, 1000); // Poll every second
  }, [chatId]);

  // Layer 2: WebSocket (Secondary)
  const setupWebSocket = useCallback(() => {
    try {
      const channel = supabase
        .channel(`chat-${chatId}-${Date.now()}`)
        .on('postgres_changes', 
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'messages',
            filter: `circle_id=eq.${chatId}`
          },
          (payload) => {
            const message = payload.new as Message;
            setMessages(prev => {
              if (prev.find(m => m.id === message.id)) return prev;
              return [...prev, message].sort((a, b) => 
                new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
              );
            });
            
            if (message.created_at > lastMessageTime.current) {
              lastMessageTime.current = message.created_at;
            }
          }
        )
        .subscribe();

      return channel;
    } catch (error) {
      console.warn('WebSocket setup failed:', error);
      return null;
    }
  }, [chatId]);

  // Layer 3: Visibility Change Recovery
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Force refresh when tab becomes visible
        setTimeout(() => startPolling(), 100);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [startPolling]);

  // Layer 4: Focus Recovery
  useEffect(() => {
    const handleFocus = () => startPolling();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [startPolling]);

  // Initialize messaging
  useEffect(() => {
    if (!user || !chatId) return;

    // Load initial messages
    const loadInitialMessages = async () => {
      try {
        // Only support circles for now
        if (chatId.includes('-')) {
          return; // Skip conversations
        }
        
        const query = supabase
          .from('messages')
          .select('id, sender_id, content, circle_id, conversation_id, message_type, created_at')
          .eq('circle_id', chatId)
          .order('created_at', { ascending: true })
          .limit(100);

        const { data, error } = await query;
        
        if (error) {
          console.error('Database error:', error);
          return;
        }
        
        if (data && data.length > 0) {
          setMessages(data);
          lastMessageTime.current = data[data.length - 1].created_at;
        }
      } catch (error) {
        console.error('Failed to load initial messages:', error);
      }
    };

    loadInitialMessages();
    startPolling();
    const wsChannel = setupWebSocket();

    return () => {
      if (pollInterval.current) clearInterval(pollInterval.current);
      wsChannel?.unsubscribe();
    };
  }, [user, chatId, startPolling, setupWebSocket]);

  // Send message with guaranteed delivery
  const sendMessage = useCallback(async (content: string) => {
    if (!user || !content.trim()) return;

    const tempId = `temp-${Date.now()}-${Math.random()}`;
    // Only support circles for now
    if (chatId.includes('-')) {
      console.warn('Conversations not supported yet');
      return;
    }
    
    const optimisticMessage: Message = {
      id: tempId,
      sender_id: user.id,
      content: content.trim(),
      circle_id: chatId,
      conversation_id: undefined,
      message_type: 'text',
      created_at: new Date().toISOString(),
    };

    // Add optimistic message
    setMessages(prev => [...prev, optimisticMessage]);

    // Send with retry logic
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      try {
        const { data, error } = await supabase
          .from('messages')
          .insert([{
            sender_id: user.id,
            content: content.trim(),
            circle_id: chatId,
            conversation_id: null,
            message_type: 'text'
          }])
          .select('id, sender_id, content, circle_id, conversation_id, message_type, created_at')
          .single();

        if (!error && data) {
          // Replace optimistic message with real one
          setMessages(prev => prev.map(m => 
            m.id === tempId ? data : m
          ));
          return;
        }
        
        throw error;
      } catch (error) {
        attempts++;
        if (attempts >= maxAttempts) {
          // Mark as failed
          setMessages(prev => prev.map(m => 
            m.id === tempId ? { ...m, failed: true } : m
          ));
          console.error('Failed to send message after retries:', error);
        } else {
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
        }
      }
    }
  }, [user, chatId]);

  return {
    messages,
    sendMessage,
    isConnected
  };
};