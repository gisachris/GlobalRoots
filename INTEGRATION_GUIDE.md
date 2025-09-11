# Chat System Integration Guide

## Step 1: Database Setup

Run the integration script to add chat functionality to your existing circles:

```bash
# Connect to your Supabase database and run:
psql -d your_database -f database/chat_integration.sql
```

Or in Supabase Dashboard SQL Editor, copy and paste the contents of `database/chat_integration.sql`

## Step 2: Verify Database Changes

Check that these tables were created:
- ✅ `messages` - For all chat messages
- ✅ `conversations` - For 1-to-1 chats  
- ✅ `invitations` - For circle invitations
- ✅ `circle_participants` - Should now have `role` column

## Step 3: Test the Integration

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to mentor messages:**
   - Login as a mentor
   - Go to `/mentor/messages`

3. **Test circle chat:**
   - Your existing circles should appear in the chat list
   - Click on a circle to open the chat interface
   - Send a test message
   - Try inviting a member using the invite button

## Step 4: Verify Real-time Functionality

1. **Open two browser windows:**
   - Login as mentor in one
   - Login as mentee in another (if you have test accounts)

2. **Test real-time messaging:**
   - Send messages from one window
   - Verify they appear instantly in the other

## Step 5: Test Circle Invitations

1. **In mentor messages, click a circle**
2. **Click the invite button (UserPlus icon)**
3. **Enter email addresses**
4. **Send invitations**
5. **Check your email system for invitation emails** (you may need to implement email sending)

## Troubleshooting

### Common Issues:

**1. Messages not appearing:**
- Check browser console for errors
- Verify RLS policies are applied
- Ensure user is authenticated

**2. Real-time not working:**
- Check Supabase real-time is enabled
- Verify WebSocket connection in Network tab
- Check for JavaScript errors

**3. Invitations failing:**
- Verify mentor owns the circle
- Check email format is valid
- Ensure invitation table has proper permissions

### Database Verification Queries:

```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('messages', 'conversations', 'invitations');

-- Check circle_participants has role column
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'circle_participants' 
AND column_name = 'role';

-- Test message insertion (replace UUIDs with real values)
INSERT INTO messages (sender_id, circle_id, content) 
VALUES ('your-user-id', 'your-circle-id', 'Test message');
```

## Next Steps

Once basic functionality is working:

1. **Add email notifications** for invitations
2. **Implement 1-to-1 conversations**
3. **Add typing indicators**
4. **Enhance with file sharing**

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify database permissions in Supabase
3. Test with simple SQL queries first
4. Ensure all environment variables are set correctly