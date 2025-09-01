import { useState } from 'react';
import { SignIn } from '../components/auth/SignIn';
import { SignUp } from '../components/auth/SignUp';
import { useLanguage } from '../utils/language';
import { TrendingUpIcon, GlobeIcon, HeartIcon, ArrowRightIcon } from 'lucide-react';

export const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F0] via-white to-[#F5F5F0] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B45309' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative min-h-screen flex">
        {/* Left Panel - Hero Section */}
        <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1a100c] dark:bg-gray-900" />
          
          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
          
          <div className="relative z-10 flex flex-col justify-center px-16 py-20">
            
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
                Empowering Rwanda's
                <span className="block text-orange-200">Future Leaders</span>
              </h1>
              
              <p className="text-lg text-white/90 mb-10 leading-relaxed">
                Connect with global mentors, access opportunities, and build the skills needed to transform Rwanda's economy.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mr-4 group-hover:bg-white/25 transition-colors">
                    <GlobeIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Global Network</h3>
                    <p className="text-white/80 text-sm">Access 1000+ diaspora professionals</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mr-4 group-hover:bg-white/25 transition-colors">
                    <TrendingUpIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Career Growth</h3>
                    <p className="text-white/80 text-sm">92% career advancement success rate</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mr-4 group-hover:bg-white/25 transition-colors">
                    <HeartIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Community Impact</h3>
                    <p className="text-white/80 text-sm">Join 5000+ changemakers in Rwanda</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="w-full lg:w-[65%] flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#503314] dark:text-white mb-3">
                {isSignIn ? 'Welcome Back!' : 'Join the Movement'}
              </h2>
              <p className="text-[#7C2D12] dark:text-gray-300 text-lg">
                {isSignIn ? 'Continue building your future' : 'Start your journey to success'}
              </p>
            </div>
            
            {/* Auth Tabs */}
            <div className="bg-[#F5F5F0] dark:bg-gray-800 rounded-2xl p-2 mb-8">
              <div className="grid grid-cols-2 gap-2">
                <button 
                  className={`py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    isSignIn 
                      ? 'bg-white dark:bg-gray-700 text-[#B45309] shadow-lg transform scale-105' 
                      : 'text-[#7C2D12] dark:text-gray-300 hover:text-[#B45309]'
                  }`} 
                  onClick={() => setIsSignIn(true)}
                >
                  {t('auth.signIn')}
                </button>
                <button 
                  className={`py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    !isSignIn 
                      ? 'bg-white dark:bg-gray-700 text-[#B45309] shadow-lg transform scale-105' 
                      : 'text-[#7C2D12] dark:text-gray-300 hover:text-[#B45309]'
                  }`} 
                  onClick={() => setIsSignIn(false)}
                >
                  {t('auth.signUp')}
                </button>
              </div>
            </div>
            
            {/* Auth Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-[#B45309]/10 overflow-hidden">
              <div className="p-8">
                {isSignIn ? (
                  <SignIn onSignUp={() => setIsSignIn(false)} />
                ) : (
                  <SignUp onSignIn={() => setIsSignIn(true)} />
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-sm text-[#7C2D12] dark:text-gray-400 mb-2">
                By continuing, you agree to our
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <a href="/terms" className="text-[#B45309] hover:text-[#92400E] font-medium hover:underline transition-colors flex items-center">
                  Terms of Service
                  <ArrowRightIcon className="h-3 w-3 ml-1" />
                </a>
                <span className="text-[#7C2D12] dark:text-gray-400">•</span>
                <a href="/privacy" className="text-[#B45309] hover:text-[#92400E] font-medium hover:underline transition-colors flex items-center">
                  Privacy Policy
                  <ArrowRightIcon className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};