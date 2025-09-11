-- Test script to verify invitation system database setup

-- Check if invitations table exists and has correct structure
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'invitations' 
ORDER BY ordinal_position;

-- Check if there are any existing invitations
SELECT COUNT(*) as total_invitations FROM invitations;

-- Check if there are any circles to invite to
SELECT COUNT(*) as total_circles FROM circles;

-- Test creating a sample invitation (replace with actual circle_id and user_id)
-- INSERT INTO invitations (circle_id, email, invited_by, token, status) 
-- VALUES ('your-circle-id', 'test@example.com', 'your-user-id', 'test-token-123', 'pending');

-- Check RLS policies on invitations table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'invitations';