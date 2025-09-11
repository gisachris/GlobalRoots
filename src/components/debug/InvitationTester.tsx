import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { circlesService } from '../../services/circles';
import { supabase } from '../../lib/supabase-client';

export const InvitationTester: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testInvitationSystem = async () => {
    setLoading(true);
    setTestResults([]);
    
    try {
      addResult('Starting invitation system test...');
      
      // Test 1: Check if we can query invitations table
      const { data: invitations, error: queryError } = await supabase
        .from('invitations')
        .select('*')
        .limit(5);
      
      if (queryError) {
        addResult(`❌ Database query failed: ${queryError.message}`);
        return;
      }
      
      addResult(`✅ Database accessible. Found ${invitations?.length || 0} invitations`);
      
      // Test 2: Check if we can query circles
      const { data: circles, error: circlesError } = await supabase
        .from('circles')
        .select('*')
        .limit(1);
      
      if (circlesError) {
        addResult(`❌ Circles query failed: ${circlesError.message}`);
        return;
      }
      
      if (!circles || circles.length === 0) {
        addResult('❌ No circles found. Create a circle first to test invitations.');
        return;
      }
      
      addResult(`✅ Found ${circles.length} circle(s)`);
      
      // Test 3: Generate invite link
      try {
        const inviteLink = await circlesService.generateInviteLink(circles[0].id);
        addResult(`✅ Generated invite link: ${inviteLink}`);
        
        // Extract token from link
        const token = inviteLink.split('/invite/')[1];
        addResult(`✅ Extracted token: ${token}`);
        
        // Test 4: Verify invitation was stored
        const { data: storedInvite, error: verifyError } = await supabase
          .from('invitations')
          .select('*')
          .eq('token', token)
          .single();
        
        if (verifyError) {
          addResult(`❌ Failed to verify stored invitation: ${verifyError.message}`);
        } else {
          addResult(`✅ Invitation stored successfully. Circle ID: ${storedInvite.circle_id}`);
        }
        
      } catch (linkError) {
        addResult(`❌ Failed to generate invite link: ${linkError}`);
      }
      
    } catch (error) {
      addResult(`❌ Test failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Invitation System Tester</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={testInvitationSystem} 
          disabled={loading}
          className="mb-4"
        >
          {loading ? 'Testing...' : 'Test Invitation System'}
        </Button>
        
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {testResults.map((result, index) => (
            <div key={index} className="text-sm font-mono bg-gray-50 p-2 rounded">
              {result}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};