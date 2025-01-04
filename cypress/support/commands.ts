/* eslint-disable */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-namespace */
// import 'cypress-real-events/support';
import { BASE_URL, BEARER_TOKEN } from './constants';

Cypress.on('uncaught:exception', () => {
  return false;
});

var apiRequestBody: any;
var apiEndpoint: string ;
var apiResponse: Cypress.Response<any>;
const fs = require('fs');

Cypress.Commands.add('createPublicGist', appName => {
  apiRequestBody = require('../../fixtures/api_data/create_gist/positive_payloads/CreatePublicGist.json');
  apiEndpoint = BASE_URL + '/gists';
  cy.request({
      method:'POST',
      url:apiEndpoint,
      body:apiRequestBody,
      failOnStatusCode: false,
      headers: {
          'Authorization' : 'Bearer ' + BEARER_TOKEN
      }
  }).then( (response) => {
      apiResponse = response;
      cy.wrap(response.body.id).as('gistsID');
  })
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      createPublicGist(appName: string): Chainable<Element>;
  }
}