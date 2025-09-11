import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SimpleAuthContainer } from '../components/auth/SimpleAuthContainer';
import { ToastContainer } from 'react-toastify';

export const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'signin';
  const role = searchParams.get('role');

  console.log('AuthPage - mode:', mode, 'role:', role); // Debug log

  return (
    <>
      <div className='absolute top-0 z-50'>
        <ToastContainer position='top-right'/>
      </div>
      <SimpleAuthContainer initialMode={mode} initialRole={role} />
    </>
  );
};