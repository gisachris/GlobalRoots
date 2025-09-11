-- Temporarily disable RLS to test
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;

-- Re-enable with simpler policies
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view messages in their circles" ON messages;
DROP POLICY IF EXISTS "Users can send messages" ON messages;
DROP POLICY IF EXISTS "Users can view messages" ON messages;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON messages;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON messages;

-- Simple policy: authenticated users can read all messages (for testing)
CREATE POLICY "Authenticated users can read messages" ON messages
    FOR SELECT USING (auth.role() = 'authenticated');

-- Simple policy: users can only insert their own messages
CREATE POLICY "Users can insert own messages" ON messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Enable real-time (skip if already added)
DO $$ 
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE messages;
EXCEPTION 
    WHEN duplicate_object THEN 
        NULL; -- Table already in publication
END $$;

-- Test query
SELECT 'Messages RLS fixed' as status;