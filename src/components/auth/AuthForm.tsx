import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../utils/language";
import { useAuth } from "../../utils/auth";
import { toast } from "react-toastify";
import { Logo } from "../ui/Logo";
import { Linkedin, Lock, Mail, User } from "lucide-react";
import { SiGoogle } from "react-icons/si";

interface AuthFormProps {
  isSignUp: boolean;
  onToggleMode: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  isSignUp,
  onToggleMode,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/signin";
      const body = isSignUp
        ? formData
        : { email: formData.email, password: formData.password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(
          isSignUp ? "Account created successfully!" : "Login successful!"
        );
        login(data.token, data.user);
        navigate("/dashboard");
      } else {
        toast.error(data.error || "Authentication failed");
      }
    } catch (error) {
      toast.error("Authentication failed");
      console.error("Auth error:", error);
    }
  };

  const handleGoogleSignup = () => {
    toast.info("Google Sign-in coming soon!");
  };

  return (
    <div className="h-full flex flex-col justify-center p-2 sm:p-4">
      <div className="w-full max-w-sm mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Logo isFooter={false} />
        </div>

        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-[#503314] dark:text-white mb-1">
            {isSignUp ? 'Join Global Roots' : 'Welcome Back'}
          </h1>
          <p className="text-sm text-[#7C2D12] dark:text-gray-300">
            {isSignUp
              ? "Create your account to get started"
              : "Sign in to your account"}
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-semibold text-[#503314] dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-3 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent transition-all text-sm bg-white dark:bg-gray-700 text-[#503314] dark:text-white"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-[#503314] dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                <Mail size={16} />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-8 pr-3 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent transition-all text-sm bg-white dark:bg-gray-700 text-[#503314] dark:text-white"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#503314] dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-8 pr-10 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent transition-all text-sm bg-white dark:bg-gray-700 text-[#503314] dark:text-white"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#B45309] text-sm"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-semibold text-[#503314] dark:text-gray-300 mb-1">
                I am a
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent transition-all text-sm bg-white dark:bg-gray-700 text-[#503314] dark:text-white"
              >
                <option value="">Select your role</option>
                <option value="mentee">Mentee - Looking for guidance</option>
                <option value="mentor">Mentor - Ready to guide others</option>
                <option value="business">
                  Business/Employer - Hiring talent
                </option>
              </select>
            </div>
          )}

          {isSignUp && (
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-3 w-3 text-[#B45309] focus:ring-[#B45309] border-gray-300 rounded"
                required
              />
              <label
                htmlFor="terms"
                className="ml-2 text-xs text-[#7C2D12] dark:text-gray-400"
              >
                I agree to the{" "}
                <a href="#" className="text-[#B45309] hover:text-[#92400E]">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#B45309] hover:text-[#92400E]">
                  Privacy Policy
                </a>
              </label>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-[#B45309] hover:bg-[#92400E] text-white font-semibold py-3 sm:py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white dark:bg-gray-800 text-[#7C2D12] dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="flex items-center justify-center px-4 py-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-[#503314] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 text-sm"
            >
              <SiGoogle className="mr-2" />
              Google
            </button>
            <button
              type="button"
              onClick={() => toast.info("LinkedIn Sign-in coming soon!")}
              className="flex items-center justify-center px-4 py-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-[#503314] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 text-sm"
            >
              <Linkedin size={16} className="mr-2" />
              LinkedIn
            </button>
          </div>

          {/* Toggle Link */}
          <div className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <span className="text-sm text-[#7C2D12] dark:text-gray-400">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </span>
            <button
              onClick={onToggleMode}
              className="ml-2 text-[#B45309] hover:text-[#92400E] font-semibold transition-colors text-sm underline"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};