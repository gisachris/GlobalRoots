import React from 'react';
import { SimpleAuthContainer } from '../components/auth/SimpleAuthContainer';
import { ToastContainer } from 'react-toastify';

export const AuthPage = () => {
  return (
    <>
      <div className='absolute top-0 z-50'>
        <ToastContainer position='top-right'/>
      </div>
      <SimpleAuthContainer />
    </>
  );
};