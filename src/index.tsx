import './index.css';
import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { makeServer } from './mirage/server';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

render(
  <App />, 
  document.getElementById("root")
);