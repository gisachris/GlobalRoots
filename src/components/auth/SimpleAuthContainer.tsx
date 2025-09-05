import React, { useState } from "react";
import { AuthForm } from "./AuthForm";

export const SimpleAuthContainer: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center py-4 px-4">
      <div className="w-full max-w-6xl">
        {/* Desktop Layout */}
        <div className="hidden lg:block relative overflow-hidden">
          {/* Hero Content Panel */}
          <div
            className={`absolute inset-y-0 w-1/2 transition-all duration-1000 ease-in-out transform ${
              isSignUp ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full flex flex-col justify-center text-center p-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-all duration-700 leading-tight">
                {isSignUp
                  ? "Join Rwanda's Tech Revolution"
                  : "Welcome Back to Your Journey"}
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 transition-all duration-700 delay-100 leading-relaxed max-w-md mx-auto">
                {isSignUp
                  ? "Connect with mentors, find opportunities, and grow your career in Rwanda's thriving tech ecosystem."
                  : "Continue building your network and advancing your career with Rwanda's tech community."}
              </p>

              <div className="flex justify-center transition-all duration-700 delay-200">
                <div className="relative group cursor-pointer">
                  <img
                    src="/hero.png"
                    alt="Global Roots Platform"
                    className="max-w-sm w-full object-contain transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
                  />
                </div>
              </div>

              <div className="mt-8 transition-all duration-700 delay-300">
                <div className="flex justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <div className="font-semibold text-[#B45309] text-lg">
                      1000+
                    </div>
                    <div>Tech Professionals</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-[#B45309] text-lg">
                      500+
                    </div>
                    <div>Mentorship Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-[#B45309] text-lg">
                      200+
                    </div>
                    <div>Job Opportunities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Auth Form Panel */}
          <div
            className={`absolute inset-y-0 w-1/2 transition-all duration-1000 ease-in-out transform ${
              isSignUp ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
              <AuthForm isSignUp={isSignUp} onToggleMode={handleToggle} />
            </div>
          </div>

          {/* Spacer to maintain height */}
          <div className="h-[650px]"></div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <AuthForm isSignUp={isSignUp} onToggleMode={handleToggle} />
          </div>
        </div>
      </div>
    </div>
  );
};