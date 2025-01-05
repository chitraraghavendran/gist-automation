/* eslint-disable */
import { And, Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL, BEARER_TOKEN } from '../../support/constants';

import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv); // Adding standard formats like "uri", "email", etc.

var apiEndpoint: string ;

Given ('the API endpoint for create Gist', () => {
    apiEndpoint = BASE_URL + '/gists';
});

When('I send POST request with request payload as {string}', requestBodyFilePath => {
    cy.apiRequestWithBodyFilePath('POST', apiEndpoint,BEARER_TOKEN, requestBodyFilePath );
       
});

When ('I send POST request with valid request payload, with token as {string}', token => {
    cy.apiRequestWithBodyFilePath('POST', apiEndpoint,token, 'api_data/create_gist/positive_payloads/CreateSecretGist.json' );
});
