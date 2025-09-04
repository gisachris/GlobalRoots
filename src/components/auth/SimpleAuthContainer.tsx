import React, { useState, useEffect } from "react";
import { AuthForm } from "./AuthForm";

export const SimpleAuthContainer: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-5xl">
        <div className="relative overflow-hidden">
          {/* Hero Content Panel */}
          <div
            className={`absolute inset-y-0 w-max transition-all duration-1000 ease-in-out transform ${
              isSignUp ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full flex flex-col justify-center text-center p-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-700">
                Your Digital Roots Start Here.
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 transition-all duration-700 delay-100">
                Connect. Grow. Strengthen Rwanda's tech ecosystem.
              </p>

              <div className="flex justify-center transition-all duration-700 delay-200">
                <div className="relative group cursor-pointer">
                  <img
                    src="/hero.png"
                    alt="Global Roots Platform"
                    className="max-w-md w-full object-contain transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
                  />
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
          <div className="h-[600px]"></div>
        </div>
      </div>
    </div>
  );
};
