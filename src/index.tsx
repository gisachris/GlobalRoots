import './index.css';
import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { makeServer } from './mirage/server';
import { AuthProvider } from './utils/auth';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

render(
  <AuthProvider>
    <App />
  </AuthProvider>, 
  document.getElementById("root")
);