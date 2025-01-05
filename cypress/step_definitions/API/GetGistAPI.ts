/* eslint-disable */
import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL, BEARER_TOKEN } from '../../support/constants';

let apiRequestBody: any;
let createApiEndpoint: string;
let getApiEndpoint: string;
let gistID: string;

Given ('I create a Gist to get gist id from the response and contruct the API endpoint', () => {
    createApiEndpoint = BASE_URL + '/gists';
    apiRequestBody = 'api_data/create_gist/positive_payloads/CreatePublicGist.json'
    cy.apiRequestWithBodyFilePath('POST', createApiEndpoint, BEARER_TOKEN, apiRequestBody);

    cy.get('@apiResponse').then((response) => {
        const res = response as unknown as Cypress.Response<any>;
        gistID = res.body.id;
        getApiEndpoint = BASE_URL + '/gists/' + gistID;
    }); 
});

When ('I send GET request using above constructed endpoint', () => {
    cy.apiRequest('GET', getApiEndpoint, BEARER_TOKEN);
});

Given ('I construct endpoint with invalid gistID', () => {
    getApiEndpoint = BASE_URL + '/gists/' + 'DummyGistID';
});

Given ('I construct invalid endpoint', () => {
    createApiEndpoint = BASE_URL + '/gists';
    apiRequestBody = 'api_data/create_gist/positive_payloads/CreatePublicGist.json'
    cy.apiRequestWithBodyFilePath('POST', createApiEndpoint, BEARER_TOKEN, apiRequestBody);

    cy.get('@apiResponse').then((response) => {
        const res = response as unknown as Cypress.Response<any>;
        gistID = res.body.id;
        getApiEndpoint = BASE_URL + '/gist/' + gistID;
    }); 
});

