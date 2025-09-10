-- Create function to get user profile data
CREATE OR REPLACE FUNCTION get_user_profile(user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'full_name', raw_user_meta_data->>'full_name',
    'role', raw_user_meta_data->>'role',
    'avatar_url', raw_user_meta_data->>'avatar_url'
  )
  INTO result
  FROM auth.users
  WHERE id = user_id;
  
  RETURN result;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_user_profile(UUID) TO authenticated;