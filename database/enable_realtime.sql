-- Enable real-time for messages table
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- Fix RLS policies to prevent 403 errors
DROP POLICY IF EXISTS "Users can view messages in their circles" ON messages;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON messages;
DROP POLICY IF EXISTS "Users can view messages" ON messages;

-- Simple policy: users can view messages they sent or in circles they're part of
CREATE POLICY "Users can view messages" ON messages
    FOR SELECT USING (
        sender_id = auth.uid() OR
        (circle_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM circle_participants cp 
            WHERE cp.circle_id = messages.circle_id 
            AND cp.user_id = auth.uid() 
            AND cp.status = 'accepted'
        )) OR
        (circle_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM circles c 
            WHERE c.id = messages.circle_id 
            AND c.mentor_id = auth.uid()
        )) OR
        (conversation_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM conversations conv 
            WHERE conv.id = messages.conversation_id 
            AND (conv.mentor_id = auth.uid() OR conv.mentee_id = auth.uid())
        ))
    );

-- Allow users to insert their own messages
DROP POLICY IF EXISTS "Users can send messages" ON messages;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON messages;

CREATE POLICY "Users can send messages" ON messages
    FOR INSERT WITH CHECK (
        sender_id = auth.uid() AND
        (
            (circle_id IS NOT NULL AND (
                EXISTS (SELECT 1 FROM circle_participants WHERE circle_id = messages.circle_id AND user_id = auth.uid() AND status = 'accepted') OR
                EXISTS (SELECT 1 FROM circles WHERE id = messages.circle_id AND mentor_id = auth.uid())
            )) OR
            (conversation_id IS NOT NULL AND EXISTS (
                SELECT 1 FROM conversations WHERE id = messages.conversation_id AND (mentor_id = auth.uid() OR mentee_id = auth.uid())
            ))
        )
    );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_circle_created ON messages(circle_id, created_at);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_created ON messages(conversation_id, created_at);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);

-- Enable real-time for circle_participants (for member count updates)
ALTER PUBLICATION supabase_realtime ADD TABLE circle_participants;