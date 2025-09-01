import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { useLanguage } from '../../utils/language';
import { useAuth } from '../../utils/auth';
import { UserIcon, AtSignIcon, KeyIcon, GithubIcon, LinkedinIcon } from 'lucide-react';
export const SignUp = ({
  onSignIn
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token, data.user);
        navigate('/dashboard');
      } else {
        console.error('Sign up failed:', data.error);
      }
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };
  return <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{t('auth.createAccount')}</CardTitle>
        <CardDescription>Join the Global Roots community</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 h-5 w-5" />
                <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="input pl-10 w-full" placeholder="John Doe" required />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                {t('auth.email')}
              </label>
              <div className="relative">
                <AtSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 h-5 w-5" />
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="input pl-10 w-full" placeholder="your.email@example.com" required />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                {t('auth.password')}
              </label>
              <div className="relative">
                <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 h-5 w-5" />
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="input pl-10 w-full" placeholder="••••••••" required />
              </div>
              <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">
                Must be at least 8 characters long
              </p>
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-1">
                I am a...
              </label>
              <select id="role" value={role} onChange={e => setRole(e.target.value)} className="input w-full" required>
                <option value="" disabled>
                  Select your role
                </option>
                <option value="youth">Youth in Rwanda</option>
                <option value="diaspora">Diaspora Professional</option>
                <option value="employer">Employer</option>
              </select>
            </div>
            <div className="flex items-center">
              <input id="terms" type="checkbox" className="h-4 w-4 rounded border-primary-300 text-primary-600 focus:ring-primary-500 accent-orange-800" required />
              <label htmlFor="terms" className="ml-2 block text-sm text-dark-600 dark:text-primary-300">
                I agree to the{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </a>
              </label>
            </div>
            <Button type="submit" variant="primary" className="w-full">
              {t('auth.createAccount')}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-primary-200 dark:border-dark-600" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white dark:bg-gray-800 text-dark-500 dark:text-dark-300">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" type="button" className="flex items-center justify-center">
              <GithubIcon className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" type="button" className="flex items-center justify-center">
              <LinkedinIcon className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-dark-500 dark:text-dark-300">
          {t('auth.alreadyHaveAccount')}{' '}
          <button type="button" onClick={onSignIn} className="text-primary-600 hover:text-primary-700 font-medium">
            {t('auth.signIn')}
          </button>
        </div>
      </CardFooter>
    </Card>;
};