import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase-client';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';

type Status = 'verifying' | 'success' | 'error';

const EmailConfirmation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>('verifying');
  const [message, setMessage] = useState('Verifying your email...');

  // Don't redirect authenticated users immediately - let them see confirmation
  const { user } = useAuthRedirect();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const token = searchParams.get('token');
      const type = searchParams.get('type');

      if (!token || type !== 'signup') {
        setStatus('error');
        setMessage('Invalid confirmation link');
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup',
        });

        if (error) throw error;

        setStatus('success');
        setMessage('Email confirmed successfully! Redirecting to your dashboard...');

        // Use role-based redirection after successful confirmation
        setTimeout(() => {
          if (user?.role === 'youth') {
            navigate('/');
          } else if (user?.role === 'mentor') {
            navigate('/mentor/dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 2000);
      } catch (err) {
        setStatus('error');
        setMessage('Failed to confirm email. Please try again.');
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate, user]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center py-4 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700 px-8 pt-6 pb-8 text-center">
          {status === 'verifying' && (
            <div>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Verifying Email</h2>
              <p className="text-gray-600 dark:text-gray-300">{message}</p>
            </div>
          )}

          {status === 'success' && (
            <div>
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h2 className="text-xl font-bold mb-4 text-green-600">Email Confirmed!</h2>
              <p className="text-gray-600 dark:text-gray-300">{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div>
              <div className="text-red-500 text-5xl mb-4">✗</div>
              <h2 className="text-xl font-bold mb-4 text-red-600">Confirmation Failed</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{message}</p>
              <button
                onClick={() => navigate('/auth')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                Go to Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;