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

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      apiRequestWithBodyFilePath(method: string, endpoint: string, token: string, bodyFilePath: string):Chainable<Response<any>>;
      apiRequest(method: string, endpoint: string, token: string):Chainable<Response<any>>;
      apiRequestWithoutToken(method: string, endpoint: string):Chainable<Response<any>>;
  }
}
}

//Custom method definition for apiRequestWithFailOnStatusCode
Cypress.Commands.add('apiRequestWithBodyFilePath', (method: string, endpoint: string, token: string, bodyFilePath: string) => {
  cy.fixture(bodyFilePath).then((requestBody) => {
    cy.request({
      method,
      url: endpoint,
      body: requestBody,
      failOnStatusCode: false,
      headers: {
          'Authorization': 'Bearer ' + token
      }
    }).then((response) => {
          cy.wrap(response).as('apiResponse');
    });
  });
});
   
//Custom method definition for apiRequest
Cypress.Commands.add('apiRequest', (method: string, endpoint: string, token: string) => {
  cy.request({
    method,
    url:endpoint,
    failOnStatusCode: false,
    headers: {
        'Authorization' : 'Bearer ' + token
    }
   }).then( (response) => {
    cy.wrap(response).as('apiResponse');
  });
});

//Custom method definition for apiRequestWithoutToken
Cypress.Commands.add('apiRequestWithoutToken', (method: string, endpoint: string) => {
  cy.request({
    method,
    url:endpoint,
    failOnStatusCode: false,
   }).then( (response) => {
    cy.wrap(response).as('apiResponse');
  });
});