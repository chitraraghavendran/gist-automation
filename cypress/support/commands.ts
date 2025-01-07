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
      apiRequest(method: string, endpoint: string, token?: string, bodyFilePath?: string):Chainable<Response<any>>;
  }
}
}

//Custom method definition for apiRequest
Cypress.Commands.add('apiRequest', (method: string, endpoint: string, token: string, bodyFilePath: string) => {
  if(bodyFilePath){
    cy.fixture(bodyFilePath).then((requestBody) => {
      makeAPICall(method, endpoint, token, requestBody);
    });
  }else{
    makeAPICall(method, endpoint, token);
  }
});

function makeAPICall(method: string, endpoint: string, token: string, requestBody?: string){
  cy.request({
    method,
    url: endpoint,
    body: requestBody ? requestBody : undefined,
    failOnStatusCode: false,
    headers: token ? {'Authorization': 'Bearer ' + token} : undefined
  }).then((response) => {
        cy.log('API Response is : ' + JSON.stringify(response.body));
        cy.wrap(response).as('apiResponse');
  });
}

