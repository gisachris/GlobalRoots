import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Users, CheckCircle, XCircle, Loader } from 'lucide-react';
import { circlesService } from '../services/circles';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase-client';

export const Invite: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [invitation, setInvitation] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    const handleInvitation = async () => {
      if (!token) {
        setError('Invalid invitation link - no token provided');
        setLoading(false);
        return;
      }

      setDebugInfo(`Processing token: ${token}`);

      if (!user) {
        // Store the invitation token in localStorage for after login
        localStorage.setItem('pendingInviteToken', token);
        // Redirect to login with return URL
        navigate(`/auth?redirect=${encodeURIComponent(`/invite/${token}`)}`);
        return;
      }

      try {
        // Check if invitation exists
        const { data: inviteData, error: inviteError } = await supabase
          .from('invitations')
          .select('*, circle:circles(title)')
          .eq('token', token)
          .eq('status', 'pending')
          .maybeSingle();

        if (inviteError) {
          throw new Error('Failed to verify invitation');
        }

        if (!inviteData) {
          throw new Error('Invalid or expired invitation link');
        }

        setInvitation(inviteData);
        await circlesService.acceptInvitation(token);
        setSuccess(true);

        // Clear any stored token
        localStorage.removeItem('pendingInviteToken');

        // Redirect based on user role
        setTimeout(() => {
          const redirectPath = user.role === 'mentor' ? '/mentor/circles' : '/circle';
          navigate(redirectPath, {
            state: { message: `Successfully joined ${inviteData.circle?.title || 'the circle'}!` }
          });
        }, 2000);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to accept invitation';
        setError(errorMessage);
        setDebugInfo(`Error: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };



    handleInvitation();
  }, [token, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader className="h-8 w-8 animate-spin mx-auto mb-4 text-[#B45309]" />
            <h2 className="text-xl font-semibold text-[#503314] mb-2">
              Processing Invitation
            </h2>
            <p className="text-[#7C2D12]">
              Please wait while we process your invitation...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <XCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold text-[#503314] mb-2">
              Invitation Error
            </h2>
            <p className="text-[#7C2D12] mb-4">
              {error}
            </p>
            {debugInfo && (
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded mb-4 whitespace-pre-line max-h-32 overflow-y-auto">
                <strong>Debug Info:</strong><br/>{debugInfo}
              </div>
            )}
            <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded mb-4">
              <strong>Troubleshooting:</strong><br/>
              • Make sure you're logged in with the correct account<br/>
              • Check if the invitation link is complete<br/>
              • Try refreshing the page<br/>
              • Contact the person who sent the invitation if issues persist
            </div>
            
            <div className="flex space-x-2">
              <Button
                onClick={() => navigate('/')}
                className="bg-[#B45309] hover:bg-[#7C2D12] flex-1"
              >
                Go Home
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="flex-1"
              >
                Retry
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h2 className="text-xl font-semibold text-[#503314] mb-2">
              Welcome to the Circle!
            </h2>
            <p className="text-[#7C2D12] mb-6">
              You have successfully joined the mentorship circle. You'll be redirected to your circles page shortly.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-[#7C2D12]">
              <Loader className="h-4 w-4 animate-spin" />
              <span>Redirecting...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};