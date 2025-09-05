import React from 'react';
import { SimpleAuthContainer } from './SimpleAuthContainer';
import { ToastContainer } from 'react-toastify';

interface SignInProps {
  onSignUp?: () => void;
}

export const SignIn = ({ onSignUp }: SignInProps) => {
  return (
    <>
      <div className='absolute top-0 z-50'>
        <ToastContainer position='top-right'/>
      </div>
      <SimpleAuthContainer />
    </>
  );
};