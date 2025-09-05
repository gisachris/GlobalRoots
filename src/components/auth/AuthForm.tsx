import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "../../utils/language";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Logo } from "../ui/Logo";
import { LoadingButton } from "../ui/LoadingButton";
import { Linkedin, Lock, Mail, User } from "lucide-react";
import { SiGoogle } from "react-icons/si";

interface AuthFormProps {
  isSignUp: boolean;
  onToggleMode: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  terms?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  isSignUp,
  onToggleMode,
}) => {
  const [searchParams] = useSearchParams();
  const preSelectedRole = searchParams.get('role');

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: preSelectedRole || "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { t } = useLanguage();
  const { signIn, signUp, isSigningIn, isSigningUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (preSelectedRole) {
      setFormData(prev => ({ ...prev, role: preSelectedRole }));
    }
  }, [preSelectedRole]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isSignUp) {
      if (!formData.name.trim()) {
        newErrors.name = "Full name is required";
      }
      if (!formData.role) {
        newErrors.role = "Please select your role";
      }
      if (!termsAccepted) {
        newErrors.terms = "You must accept the terms and conditions";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    try {
      if (isSignUp) {
        // Use Supabase signup
        await signUp(formData.email, formData.password);
        toast.success("Account created! Please check your email to verify.");
      } else {
        // Use Supabase signin
        await signIn(formData.email, formData.password);
        toast.success("Login successful!");

        // Redirect will be handled by useAuthRedirect hook
        navigate("/dashboard");
      }
    } catch (error: any) {
      // Handle specific error types
      if (error.message?.includes('429') || error.message?.includes('rate limit') || error.message?.includes('after')) {
        toast.error("Too many attempts. Please wait a minute before trying again.");
      } else if (error.message?.includes('User already registered')) {
        toast.error("An account with this email already exists. Try signing in instead.");
      } else if (error.message?.includes('Invalid login credentials')) {
        toast.error("Invalid email or password. Please check your credentials.");
      } else {
        toast.error(error.message || "Authentication failed");
      }
      console.error("Auth error:", error);
    }
  };

  const handleGoogleSignup = () => {
    toast.info("Google Sign-in coming soon!");
  };

  return (
    <div className="h-full flex flex-col justify-center p-2 sm:p-3">
      <div className="w-full max-w-sm mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <Logo isFooter={false} />
        </div>

        <div className="text-center mb-4">
          <p className="text-sm text-[#503314] dark:text-gray-300">
            {isSignUp
              ? "Create your account to get started"
              : "Sign in to your account"}
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3">
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
                  className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-all text-sm bg-white dark:bg-gray-700 text-[#503314] dark:text-white ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-[#B45309]"
                    }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
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
                className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-all text-sm bg-white dark:bg-gray-700 text-[#503314] dark:text-white ${errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-[#B45309]"
                  }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
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
                className={`w-full pl-8 pr-10 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-all text-sm bg-white dark:bg-gray-700 text-[#503314] dark:text-white ${errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-[#B45309]"
                  }`}
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
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
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
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-all text-sm bg-white dark:bg-gray-700 text-[#503314] dark:text-white ${errors.role
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-[#B45309]"
                  }`}
              >
                <option value="">Select your role</option>
                <option value="mentee">Mentee - Looking for guidance</option>
                <option value="mentor">Mentor - Ready to guide others</option>
                <option value="business">
                  Business/Employer - Hiring talent
                </option>
              </select>
              {errors.role && (
                <p className="mt-1 text-xs text-red-500">{errors.role}</p>
              )}
            </div>
          )}

          {isSignUp && (
            <div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    if (errors.terms) {
                      setErrors({ ...errors, terms: undefined });
                    }
                  }}
                  className={`mt-1 h-3 w-3 text-[#503314] focus:ring-[#B45309] border-gray-300 rounded ${errors.terms ? "border-red-500" : ""
                    }`}
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-xs text-[#503314] dark:text-gray-400"
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
              {errors.terms && (
                <p className="mt-1 text-xs text-red-500">{errors.terms}</p>
              )}
            </div>
          )}

          <LoadingButton
            loading={isSignUp ? isSigningUp : isSigningIn}
            onClick={handleSubmit}
            className="w-full bg-[#B45309] hover:bg-[#92400E] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
            loadingText={isSignUp ? "Creating Account..." : "Signing In..."}
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </LoadingButton>

          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white dark:bg-gray-800 text-[#503314] dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-[#503314] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 text-sm"
            >
              <SiGoogle className="mr-2" />
              Google
            </button>
            <button
              type="button"
              onClick={() => toast.info("LinkedIn Sign-in coming soon!")}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-[#503314] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 text-sm"
            >
              <Linkedin size={16} className="mr-2" />
              LinkedIn
            </button>
          </div>

          {/* Toggle Link */}
          <div className="text-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
            <span className="text-sm text-[#503314] dark:text-gray-400">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </span>
            <button
              onClick={onToggleMode}
              className="ml-2 text-[#B45309] hover:text-[#92400E] font-semibold transition-colors text-sm underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};