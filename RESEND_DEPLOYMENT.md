# Resend Email Integration Deployment Guide

## Prerequisites

1. **Resend Account Setup**
   - Create account at [resend.com](https://resend.com)
   - Generate API key from dashboard
   - Verify domain (optional but recommended for production)

2. **Supabase CLI Installation**
   ```bash
   npm install -g supabase
   supabase login
   ```

## Step 1: Environment Variables

Add to your `.env` file:
```env
RESEND_API_KEY=re_your_api_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
VITE_APP_URL=http://localhost:5173
```

For production, update `VITE_APP_URL` to your domain.

## Step 2: Database Setup

Run the database migration:
```sql
-- Execute in Supabase SQL Editor
\i database/email_integration.sql
```

Or manually run the SQL commands from `database/email_integration.sql`.

## Step 3: Deploy Edge Function

1. **Initialize Supabase (if not done)**
   ```bash
   supabase init
   ```

2. **Link to your project**
   ```bash
   supabase link --project-ref your-project-ref
   ```

3. **Deploy the function**
   ```bash
   supabase functions deploy send-circle-invitation
   ```

4. **Set environment variables for the function**
   ```bash
   supabase secrets set RESEND_API_KEY=re_your_api_key_here
   supabase secrets set VITE_APP_URL=https://your-domain.com
   ```

## Step 4: Update Database Trigger

Update the trigger URL in `database/email_integration.sql`:
```sql
-- Replace 'your-project-ref' with your actual Supabase project reference
url := 'https://your-project-ref.supabase.co/functions/v1/send-circle-invitation'
```

Then re-run the SQL to update the trigger.

## Step 5: Test the Integration

1. **Create a circle** via the UI
2. **Send an invitation** using the invite modal
3. **Check email delivery** in Resend dashboard
4. **Test invitation acceptance** by clicking the email link

## Troubleshooting

### Email Not Sending
- Check Resend API key is correct
- Verify edge function logs: `supabase functions logs send-circle-invitation`
- Ensure database trigger is active

### Invalid Domain Error
- Verify domain in Resend dashboard
- Use verified domain in `from` field of edge function

### Function Timeout
- Check function logs for errors
- Verify all environment variables are set
- Test function directly via Supabase dashboard

## Testing Checklist

- [ ] Edge function deploys successfully
- [ ] Database trigger executes on invitation insert
- [ ] Email arrives within 30 seconds
- [ ] Email template renders correctly on mobile
- [ ] Invitation link works for new users
- [ ] Invitation link works for existing users
- [ ] Expired invitations are handled properly
- [ ] Error handling works for invalid emails

## Cost Monitoring

- Resend free tier: 3,000 emails/month
- Monitor usage in Resend dashboard
- Set up alerts for approaching limits

## Production Considerations

1. **Domain Verification**: Verify your sending domain in Resend
2. **Rate Limiting**: Implement rate limiting for invitation sending
3. **Email Templates**: Consider using Resend's template system for better management
4. **Monitoring**: Set up logging and monitoring for email delivery
5. **Backup**: Consider fallback email service for high availability