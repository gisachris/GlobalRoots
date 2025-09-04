import React from 'react';
import { SimpleAuthContainer } from './SimpleAuthContainer';

interface SignUpProps {
  onSignIn?: () => void;
}

export const SignUp = ({ onSignIn }: SignUpProps) => {
  return <SimpleAuthContainer />;
};