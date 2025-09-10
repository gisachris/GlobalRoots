-- Create function to get user profile data
CREATE OR REPLACE FUNCTION get_user_profile(user_id UUID)
RETURNS TABLE (
  user_metadata JSONB,
  role TEXT
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    au.user_metadata,
    au.role::TEXT
  FROM auth.users au
  WHERE au.id = user_id;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_user_profile(UUID) TO authenticated;