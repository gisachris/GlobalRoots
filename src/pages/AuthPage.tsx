import { useState, useEffect } from 'react';
import { SignIn } from '../components/auth/SignIn';
import { SignUp } from '../components/auth/SignUp';
import { Card, CardContent } from '../components/ui/Card';
import { Logo } from '../components/ui/Logo';
import { useLanguage } from '../utils/language';
import { StarIcon, ShieldCheckIcon, UsersIcon } from 'lucide-react';
export const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { t } = useLanguage();
  
  useEffect(() => {
    // Add entrance animation
    const authCard = document.querySelector('.auth-card');
    if (authCard) {
      authCard.classList.add('animate-fadeIn');
    }
  }, []);
  return <div className="min-h-screen flex bg-[#F5F5F0] dark:bg-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-[#B45309]/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 bg-[#7C2D12]/10 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Left side - Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#503314] via-[#7C2D12] to-[#B45309] p-12 flex-col justify-center relative">
        <div className="max-w-md">
          <div className="mb-8">
            <Logo />
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">
            Connect. Learn. Grow.
          </h1>
          <p className="text-xl text-white/90 mb-12">
            Join Rwanda's premier platform connecting diaspora professionals with local talent.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <UsersIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Global Network</h3>
                <p className="text-white/80 text-sm">Connect with 500+ mentors worldwide</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Verified Professionals</h3>
                <p className="text-white/80 text-sm">All mentors are industry-verified</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <StarIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Success Stories</h3>
                <p className="text-white/80 text-sm">85% success rate in career growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-8">
            <Logo />
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#503314] dark:text-white mb-2">
              {isSignIn ? 'Welcome Back' : 'Join Global Roots'}
            </h2>
            <p className="text-[#7C2D12] dark:text-gray-300">
              {isSignIn ? 'Sign in to continue your journey' : 'Start your professional journey today'}
            </p>
          </div>
          
          <Card className="auth-card shadow-2xl border-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="flex border-b border-[#B45309]/20">
                <button 
                  className={`flex-1 py-4 text-center font-semibold transition-all duration-200 ${isSignIn ? 'text-[#B45309] border-b-2 border-[#B45309] bg-[#B45309]/5' : 'text-[#7C2D12] hover:text-[#B45309] hover:bg-[#F5F5F0]'}`} 
                  onClick={() => setIsSignIn(true)}
                >
                  {t('auth.signIn')}
                </button>
                <button 
                  className={`flex-1 py-4 text-center font-semibold transition-all duration-200 ${!isSignIn ? 'text-[#B45309] border-b-2 border-[#B45309] bg-[#B45309]/5' : 'text-[#7C2D12] hover:text-[#B45309] hover:bg-[#F5F5F0]'}`} 
                  onClick={() => setIsSignIn(false)}
                >
                  {t('auth.signUp')}
                </button>
              </div>
              <div className="p-8">
                {isSignIn ? <SignIn onSignUp={() => setIsSignIn(false)} /> : <SignUp onSignIn={() => setIsSignIn(true)} />}
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center text-[#7C2D12] dark:text-gray-300 text-sm mt-6">
            <p>By continuing, you agree to our</p>
            <p className="mt-1">
              <a href="/terms" className="text-[#B45309] hover:text-[#92400E] font-medium hover:underline transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-[#B45309] hover:text-[#92400E] font-medium hover:underline transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>;
};