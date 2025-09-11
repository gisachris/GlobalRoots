// Message queue for offline support
interface QueuedMessage {
  id: string;
  content: string;
  chatId: string;
  timestamp: number;
  attempts: number;
}

class MessageQueue {
  private queue: QueuedMessage[] = [];
  private isProcessing = false;

  add(message: Omit<QueuedMessage, 'attempts'>) {
    this.queue.push({ ...message, attempts: 0 });
    this.process();
  }

  private async process() {
    if (this.isProcessing || this.queue.length === 0) return;
    
    this.isProcessing = true;
    
    while (this.queue.length > 0) {
      const message = this.queue[0];
      
      try {
        // Attempt to send message
        const success = await this.sendMessage(message);
        
        if (success) {
          this.queue.shift(); // Remove from queue
        } else {
          message.attempts++;
          if (message.attempts >= 3) {
            this.queue.shift(); // Give up after 3 attempts
          } else {
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000 * message.attempts));
          }
        }
      } catch (error) {
        console.error('Queue processing error:', error);
        this.queue.shift(); // Remove problematic message
      }
    }
    
    this.isProcessing = false;
  }

  private async sendMessage(message: QueuedMessage): Promise<boolean> {
    try {
      const { supabase } = await import('../lib/supabase-client');
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return false;
      
      const insertData = {
        sender_id: user.id,
        content: message.content,
        message_type: 'text' as const,
        ...(message.chatId.includes('-') 
          ? { conversation_id: message.chatId, circle_id: null }
          : { circle_id: message.chatId, conversation_id: null }
        )
      };
      
      const { error } = await supabase
        .from('messages')
        .insert([insertData]);

      return !error;
    } catch (error) {
      return false;
    }
  }

  getQueueLength() {
    return this.queue.length;
  }
}

export const messageQueue = new MessageQueue();