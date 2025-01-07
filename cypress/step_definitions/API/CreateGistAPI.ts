/* eslint-disable */
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL, BEARER_TOKEN, GITHUB_PASSWORD, GITHUB_USERNAME } from '../../support/constants';

let apiEndpoint: string ;
let gistID: any;

Given ('the API endpoint for create Gist', () => {
    apiEndpoint = BASE_URL + '/' + '/' + GITHUB_USERNAME;
    console.log('API Bearer Token Is '+ GITHUB_USERNAME);
});

When('I send POST request with request payload as {string}', requestBodyFilePath => {
    cy.apiRequest('POST', apiEndpoint,BEARER_TOKEN, requestBodyFilePath );  
    cy.get('@apiResponse').then((response) => {
        const res = response as unknown as Cypress.Response<any>;
        gistID = res.body.id;
        cy.wrap(gistID).as('gistsID');
    }); 
});

When ('I send POST request with valid request payload, with token as {string}', token => {
    cy.apiRequest('POST', apiEndpoint,token, 'api_data/create_gist/positive_payloads/CreateSecretGist.json' );
});
