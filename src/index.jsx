import React from 'react';
import ReactDOM from 'react-dom';
import UserProvider from '@providers/User';
import App from '@/App';

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('app'),
);
