/*
  Smaller beer images?
  Make beer images in line with beer name or brewery?
  Play with colors for input and search button
  Make sure wishlist and tried beer list colors match
*/



import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import Favicon from 'react-favicon';

ReactDOM.render(
  <div>
    <App />
    <Favicon url="https://cdn.iconscout.com/public/images/icon/free/png-512/beer-mug-glass-drink-cocktail-emoj-symbol-babr-369f133aa5b11abf-512x512.png" />
  </div>
  , document.getElementById('app')
);