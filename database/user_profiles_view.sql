-- Create function to get user profile data
CREATE OR REPLACE FUNCTION get_user_profile(user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
  user_role TEXT;
BEGIN
  -- Apply same role resolution logic as AuthContext
  SELECT 
    CASE 
      WHEN raw_user_meta_data->>'role' IS NOT NULL THEN raw_user_meta_data->>'role'
      WHEN raw_user_meta_data->>'user_type' = 'mentee' THEN 'youth'
      WHEN raw_user_meta_data->>'user_type' IS NOT NULL THEN raw_user_meta_data->>'user_type'
      ELSE 'youth'
    END
  INTO user_role
  FROM auth.users
  WHERE id = user_id;
  
  SELECT json_build_object(
    'full_name', raw_user_meta_data->>'full_name',
    'role', user_role,
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