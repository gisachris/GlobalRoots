-- Simple real-time fix
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view messages in their circles" ON messages;
DROP POLICY IF EXISTS "Users can send messages" ON messages;
DROP POLICY IF EXISTS "Users can view messages" ON messages;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON messages;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON messages;
DROP POLICY IF EXISTS "Authenticated users can read messages" ON messages;
DROP POLICY IF EXISTS "Users can insert own messages" ON messages;

-- Simple policies that work
CREATE POLICY "Allow authenticated users to read messages" ON messages
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow users to insert their own messages" ON messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Ensure real-time is enabled
DO $$ 
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE messages;
EXCEPTION 
    WHEN duplicate_object THEN 
        NULL;
END $$;

-- Test
SELECT 'Simple realtime fix applied' as status;