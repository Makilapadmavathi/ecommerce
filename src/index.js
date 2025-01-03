import React from 'react';
import ReactDOM from 'react-dom';


import App from './App'; 
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './Components/Cartcontext'


ReactDOM.render(

    <BrowserRouter>
    <CartProvider>
    <App />
    </CartProvider>
    </BrowserRouter>
 ,
  document.getElementById('root')
);

