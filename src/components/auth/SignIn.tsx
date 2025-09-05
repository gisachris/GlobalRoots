import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

interface SignInFormData {
  email: string;
  password: string;
}

interface SignInErrors {
  email?: string;
  password?: string;
  submit?: string;
}

interface SignInProps {
  onSignUp?: () => void;
}

interface ForgotPasswordFormProps {
  resetPassword?: (email: string) => Promise<{ data: any; error?: Error }>;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ resetPassword }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (!email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    if (resetPassword) {
      try {
        await resetPassword(email);
        setMessage('Password reset email sent! Check your inbox.');
      } catch (resetError: any) {
        setError(resetError.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
      <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Reset Password</h3>
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-2">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-2">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-600 dark:text-white"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Reset Email'}
        </button>
      </form>
    </div>
  );
};

export const SignIn = ({ onSignUp }: SignInProps) => {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<SignInErrors>({});
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    if (onSignUp) onSignUp();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof SignInErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: SignInErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await signIn(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error: any) {
      if (error.message.includes('Invalid login credentials')) {
        setErrors({ submit: 'Invalid email or password. Please try again.' });
      } else if (error.message.includes('Email not confirmed')) {
        setErrors({
          submit: 'Please check your email and click the confirmation link before signing in.',
        });
      } else {
        setErrors({ submit: error.message });
      }
    }
  };

  return (
    <>
      <div className='absolute top-0 z-50'>
        <ToastContainer position='top-right' />
      </div>

      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center py-4 px-4">
        <div className="w-full max-w-6xl">
          {/* Desktop Layout */}
          <div className="hidden lg:block relative overflow-hidden">
            {/* Hero Content Panel */}
            <div
              className={`absolute inset-y-0 w-1/2 transition-all duration-1000 ease-in-out transform ${isSignUp ? "translate-x-0" : "translate-x-full"
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
                      <div className="font-semibold text-[#B45309] text-lg">1000+</div>
                      <div>Tech Professionals</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-[#B45309] text-lg">500+</div>
                      <div>Mentorship Connections</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-[#B45309] text-lg">200+</div>
                      <div>Job Opportunities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Auth Form Panel */}
            <div
              className={`absolute inset-y-0 w-1/2 transition-all duration-1000 ease-in-out transform ${isSignUp ? "translate-x-full" : "translate-x-0"
                }`}
            >
              <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 flex items-center">
                <div className="w-full max-w-md mx-auto">
                  <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                    Sign In
                  </h2>

                  {errors.submit && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                      {errors.submit}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none disabled:opacity-50"
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </form>

                  <div className="text-center mt-4">
                    <button
                      onClick={() => setShowForgotPassword(!showForgotPassword)}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      Forgot your password?
                    </button>
                  </div>

                  {showForgotPassword && <ForgotPasswordForm />}

                  <div className="text-center mt-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Don't have an account?{' '}
                      <button
                        onClick={handleToggle}
                        className="text-blue-500 hover:text-blue-700 font-medium"
                      >
                        Sign Up
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Spacer to maintain height */}
            <div className="h-[650px]"></div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                  Sign In
                </h2>

                {errors.submit && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {errors.submit}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none disabled:opacity-50"
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <button
                    onClick={() => setShowForgotPassword(!showForgotPassword)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Forgot your password?
                  </button>
                </div>

                {showForgotPassword && <ForgotPasswordForm />}

                <div className="text-center mt-4">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <button
                      onClick={handleToggle}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};