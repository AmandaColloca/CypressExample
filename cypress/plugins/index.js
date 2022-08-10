/// <reference types="cypress-grep" />
/// <reference types="@shelex/cypress-allure-plugin" />

/**
 * @type {Cypress.PluginConfig}
 */
const fs = require('fs-extra');
const path = require('path');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
// import allureWriter from "@shelex/cypress-allure-plugin/writer";

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve(
    '.',
    'cypress/config',
    `${file}.json`
  );

  return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {
  const file = config.env.configFile || 'staging_marketplace';
  allureWriter(on, config);

  return getConfigurationByFile(file);
};