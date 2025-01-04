/* eslint-disable */
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL, BEARER_TOKEN } from '../../support/constants';
import { expect } from 'chai';

var apiRequestBody: any;
var createApiEndpoint: string;
var getApiEndpoint: string;
var apiResponse: Cypress.Response<any>;
var gistID: string;
const fs = require('fs');

Given ('I create a Gist to get gist id from the response', () => {
    createApiEndpoint = BASE_URL + '/gists';
    cy.readFile('cypress/' + 'fixtures/api_data/create_gist/positive_payloads/CreatePublicGist.json').then((apiRequestBody) => {
        cy.request({
            method:'POST',
            url:createApiEndpoint,
            body:apiRequestBody,
            failOnStatusCode: false,
            headers: {
                'Authorization' : 'Bearer ' + BEARER_TOKEN
            }
        }).then( (response) => {
            apiResponse = response;
            gistID = response.body.id;
            cy.log('gist ID is' + gistID);
        });
    }); 
});

Given ('the API endpoint for get Gist', () => {
    getApiEndpoint = BASE_URL + '/gists/' + gistID;
});

When ('I send GET request with valid gistId in the endpoint', () => {
    cy.request({
        method:'GET',
        url:getApiEndpoint,
        failOnStatusCode: false,
        headers: {
            'Authorization' : 'Bearer ' + BEARER_TOKEN
        }
    }).then( (response) => {
        apiResponse = response;      
    });
});

Then ('the response status should be 200', () => {
    expect(apiResponse.status).to.eq(200);
    expect(apiResponse.body).to.have.property('id');
    expect(apiResponse.body).to.have.property('files');
});