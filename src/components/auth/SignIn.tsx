import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { useLanguage } from '../../utils/language';
import { useAuth } from '../../utils/auth';
import { AtSignIcon, KeyIcon, GithubIcon, LinkedinIcon } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
export const SignIn = ({onSignUp}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Login Successfully')
        login(data.token, data.user);
        navigate('/',{replace:true});
      } else {
        toast.error('Login Failed')
        console.error('Sign in failed:', data.error);
      }
    } catch (error) {
      toast.error('Login Failed')
      console.error('Sign in error:', error);
    }
  };
  return (<>
    <div className='absolute top-0'>
      <ToastContainer position='top-right'/>
    </div>
  <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{t('auth.signIn')}</CardTitle>
        <CardDescription>Access your Global Roots account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
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
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium">
                  {t('auth.password')}
                </label>
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                  {t('auth.forgotPassword')}
                </a>
              </div>
              <div className="relative">
                <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 h-5 w-5" />
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="input pl-10 w-full" placeholder="••••••••" required />
              </div>
            </div>
            <Button type="submit" variant="primary" className="w-full">
              {t('auth.signIn')}
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
          {t('auth.dontHaveAccount')}{' '}
          <button type="button" onClick={onSignUp} className="text-primary-600 hover:text-primary-700 font-medium">
            {t('auth.signUp')}
          </button>
        </div>
      </CardFooter>
    </Card>
  </>)
};