-- Disable the trigger temporarily to fix the invitation creation
DROP TRIGGER IF EXISTS trigger_send_invitation_email ON invitations;
DROP FUNCTION IF EXISTS send_invitation_email();