// index.js or App.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './Components/Cartcontext';
import { Provider } from 'react-redux';
import store from './Components/store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </Provider>,
  document.getElementById('root')
);
