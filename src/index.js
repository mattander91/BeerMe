/*
  spinner for removal of items
  remove console.logs
  Send data without stringifying for search --> don't parse on search component
  Show Beer IBU if provided
  Refactor search object, server helpers may already format

  Deployment - env't variables, db URL, etc...
    CLI: https://devcenter.heroku.com/articles/creating-apps
    remote: https://devcenter.heroku.com/articles/git#deploying-code
    config variables: https://devcenter.heroku.com/articles/config-vars
    mongo: https://devcenter.heroku.com/articles/mongolab#getting-your-connection-uri
*/



import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import Favicon from 'react-favicon';

ReactDOM.render(
  <div>
    <App />
    <Favicon url='img/beer-favicon.png'/>
  </div>
  , document.getElementById('app')
);