-- Add email tracking columns to invitations table
ALTER TABLE invitations 
ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMP WITH TIME ZONE;

-- Create database trigger to automatically send emails
CREATE OR REPLACE FUNCTION send_invitation_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Only send email for email-based invitations (not link-only)
  IF NEW.email IS NOT NULL AND NEW.email != '' THEN
    -- Call edge function to send email
    PERFORM net.http_post(
      url := 'https://tfpqvwslineokovtsduu.supabase.co/functions/v1/send-circle-invitation',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.service_role_key', true)
      ),
      body := jsonb_build_object(
        'invitationId', NEW.id,
        'email', NEW.email,
        'circleName', (SELECT title FROM circles WHERE id = NEW.circle_id),
        'inviterName', (SELECT COALESCE(user_metadata->>'full_name', email) FROM auth.users WHERE id = NEW.invited_by),
        'token', NEW.token
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_send_invitation_email ON invitations;
CREATE TRIGGER trigger_send_invitation_email
  AFTER INSERT ON invitations
  FOR EACH ROW
  EXECUTE FUNCTION send_invitation_email();

-- Enable http extension if not already enabled
CREATE EXTENSION IF NOT EXISTS http;