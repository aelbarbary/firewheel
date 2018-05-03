import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App/index';
// import routes from './routes';

import './styles/global.sass';
import './favicon.ico';


render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('app'));
