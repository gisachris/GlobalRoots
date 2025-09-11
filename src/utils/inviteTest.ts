// Test utility to verify invitation system
import { supabase } from '../lib/supabase-client';
import { circlesService } from '../services/circles';

export const testInvitationSystem = async () => {
  console.log('🧪 Testing invitation system...');
  
  try {
    // Test 1: Check database connectivity
    const { data: testQuery, error: testError } = await supabase
      .from('invitations')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('❌ Database connection failed:', testError);
      return false;
    }
    
    console.log('✅ Database connection successful');
    
    // Test 2: Check if user has circles
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      console.error('❌ User not authenticated');
      return false;
    }
    
    const circles = await circlesService.getUserCircles(user.id);
    if (circles.length === 0) {
      console.error('❌ No circles found. Create a circle first.');
      return false;
    }
    
    console.log(`✅ Found ${circles.length} circle(s)`);
    
    // Test 3: Generate invite link
    const inviteLink = await circlesService.generateInviteLink(circles[0].id);
    console.log('✅ Generated invite link:', inviteLink);
    
    // Test 4: Extract and verify token
    const token = inviteLink.split('/invite/')[1];
    const { data: invitation, error: verifyError } = await supabase
      .from('invitations')
      .select('*')
      .eq('token', token)
      .single();
    
    if (verifyError) {
      console.error('❌ Failed to verify invitation:', verifyError);
      return false;
    }
    
    console.log('✅ Invitation verified in database:', invitation);
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
};