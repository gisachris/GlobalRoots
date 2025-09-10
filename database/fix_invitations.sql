-- Fix invitation system issues

-- Ensure invitations table has correct structure
ALTER TABLE invitations 
ALTER COLUMN email DROP NOT NULL;

-- Add index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_invitations_token ON invitations(token);
CREATE INDEX IF NOT EXISTS idx_invitations_status ON invitations(status);

-- Update RLS policies to ensure proper access
DROP POLICY IF EXISTS "Users can view invitations sent to them" ON invitations;
DROP POLICY IF EXISTS "Users can view invitations they sent" ON invitations;
DROP POLICY IF EXISTS "Users can accept invitations" ON invitations;
DROP POLICY IF EXISTS "Users can view relevant invitations" ON invitations;
DROP POLICY IF EXISTS "Authenticated users can create invitations" ON invitations;

-- Allow users to view invitations sent to their email or by them
CREATE POLICY "Users can view relevant invitations" ON invitations
    FOR SELECT USING (
        auth.uid() = invited_by OR 
        email = auth.jwt() ->> 'email' OR
        email IS NULL
    );

-- Allow users to update invitations (for accepting)
CREATE POLICY "Users can accept invitations" ON invitations
    FOR UPDATE USING (
        status = 'pending' AND (
            email = auth.jwt() ->> 'email' OR
            email IS NULL
        )
    );

-- Allow authenticated users to create invitations
CREATE POLICY "Authenticated users can create invitations" ON invitations
    FOR INSERT WITH CHECK (auth.uid() = invited_by);

-- Fix circle_participants RLS policies (remove recursion)
DROP POLICY IF EXISTS "Users can view circle participants" ON circle_participants;
CREATE POLICY "Users can view circle participants" ON circle_participants
    FOR SELECT USING (
        user_id = auth.uid() OR
        circle_id IN (
            SELECT id FROM circles WHERE mentor_id = auth.uid()
        )
    );

-- Allow users to join circles (insert participants)
DROP POLICY IF EXISTS "Users can join circles" ON circle_participants;
CREATE POLICY "Users can join circles" ON circle_participants
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Allow users to update their own participation status
DROP POLICY IF EXISTS "Users can update their participation" ON circle_participants;
CREATE POLICY "Users can update their participation" ON circle_participants
    FOR UPDATE USING (user_id = auth.uid());

-- Test the setup
SELECT 'Invitation system setup completed' as status;