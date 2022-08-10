// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import '@shelex/cypress-allure-plugin';
// you can use require
// require('@shelex/cypress-allure-plugin');

// Import real events functionalities
import "cypress-real-events/support";

// Hide fetch/XHR requests
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');

  app.document.head.appendChild(style);
}

require('cypress-plugin-tab')

const registerCypressGrep = require('cypress-grep')
registerCypressGrep()
// if you want to use the "import" keyword
// import registerCypressGrep from 'cypress-grep'
// registerCypressGrep()