-- Complete Chat System Integration
-- Run this script to add full chat functionality to your existing circles

-- 1. Create circle_participants table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS circle_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  circle_id UUID NOT NULL REFERENCES circles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  role VARCHAR(20) DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(circle_id, user_id)
);

-- Add role column if table already exists
ALTER TABLE circle_participants 
ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'member';

-- Create indexes for circle_participants
CREATE INDEX IF NOT EXISTS idx_circle_participants_circle_id ON circle_participants(circle_id);
CREATE INDEX IF NOT EXISTS idx_circle_participants_user_id ON circle_participants(user_id);

-- Enable RLS for circle_participants
ALTER TABLE circle_participants ENABLE ROW LEVEL SECURITY;

-- RLS Policies for circle_participants
CREATE POLICY "Circle participants are viewable by circle mentor and participants" ON circle_participants
  FOR SELECT USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM circles WHERE circles.id = circle_id AND circles.mentor_id = auth.uid())
  );

CREATE POLICY "Users can join circles" ON circle_participants
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Mentors can update participant status" ON circle_participants
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM circles WHERE circles.id = circle_id AND circles.mentor_id = auth.uid())
  );

-- 2. Create conversations table first (referenced by messages)
CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mentee_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(mentor_id, mentee_id)
);

-- 3. Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  circle_id UUID REFERENCES circles(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT messages_target_check CHECK (
    (circle_id IS NOT NULL AND conversation_id IS NULL) OR
    (circle_id IS NULL AND conversation_id IS NOT NULL)
  )
);

-- 4. Create invitations table
CREATE TABLE IF NOT EXISTS invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  circle_id UUID NOT NULL REFERENCES circles(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  invited_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending',
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_circle_id ON messages(circle_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_conversations_mentor_id ON conversations(mentor_id);
CREATE INDEX IF NOT EXISTS idx_conversations_mentee_id ON conversations(mentee_id);
CREATE INDEX IF NOT EXISTS idx_invitations_circle_id ON invitations(circle_id);
CREATE INDEX IF NOT EXISTS idx_invitations_email ON invitations(email);
CREATE INDEX IF NOT EXISTS idx_invitations_token ON invitations(token);

-- 6. Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies for messages
CREATE POLICY "Users can view messages in their circles" ON messages
  FOR SELECT USING (
    (circle_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM circle_participants 
      WHERE circle_id = messages.circle_id 
      AND user_id = auth.uid() 
      AND status = 'accepted'
    )) OR
    (conversation_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM conversations 
      WHERE id = messages.conversation_id 
      AND (mentor_id = auth.uid() OR mentee_id = auth.uid())
    ))
  );

CREATE POLICY "Users can send messages to their circles/conversations" ON messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND (
      (circle_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM circle_participants 
        WHERE circle_id = messages.circle_id 
        AND user_id = auth.uid() 
        AND status = 'accepted'
      )) OR
      (conversation_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM conversations 
        WHERE id = messages.conversation_id 
        AND (mentor_id = auth.uid() OR mentee_id = auth.uid())
      ))
    )
  );

-- 8. RLS Policies for conversations
CREATE POLICY "Users can view their own conversations" ON conversations
  FOR SELECT USING (mentor_id = auth.uid() OR mentee_id = auth.uid());

CREATE POLICY "Users can create conversations" ON conversations
  FOR INSERT WITH CHECK (mentor_id = auth.uid() OR mentee_id = auth.uid());

-- 9. RLS Policies for invitations
CREATE POLICY "Circle mentors can view their invitations" ON invitations
  FOR SELECT USING (
    invited_by = auth.uid() OR 
    EXISTS (SELECT 1 FROM circles WHERE id = circle_id AND mentor_id = auth.uid())
  );

CREATE POLICY "Circle mentors can create invitations" ON invitations
  FOR INSERT WITH CHECK (
    invited_by = auth.uid() AND
    EXISTS (SELECT 1 FROM circles WHERE id = circle_id AND mentor_id = auth.uid())
  );

CREATE POLICY "Circle mentors can update their invitations" ON invitations
  FOR UPDATE USING (
    invited_by = auth.uid() OR 
    EXISTS (SELECT 1 FROM circles WHERE id = circle_id AND mentor_id = auth.uid())
  );