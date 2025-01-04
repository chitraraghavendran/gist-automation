/* eslint-disable */
import { And, Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL, BEARER_TOKEN } from '../../support/constants';
import Ajv from "ajv";
import addFormats from "ajv-formats";


const ajv = new Ajv();
addFormats(ajv); // Adding standard formats like "uri", "email", etc.
var apiRequestBody: any;
var apiEndpoint: string ;
var apiResponse: Cypress.Response<any>;


Given ('the API endpoint for create Gist', () => {
    apiEndpoint = BASE_URL + '/gists';
});

When('I send POST request with request payload as {string}', requestBodyFilePath => {
    cy.log(requestBodyFilePath);
    cy.readFile('cypress/' + requestBodyFilePath).then((apiRequestBody) => {
        cy.log(JSON.stringify(apiRequestBody));     
        // Send the POST request only after reading the file
        cy.request({
            method: 'POST',
            url: apiEndpoint,
            body: apiRequestBody,
            failOnStatusCode: false,
            headers: {
                'Authorization': 'Bearer ' + BEARER_TOKEN
            }
        }).then((response) => {
            apiResponse = response;
            cy.log('API Response is:', JSON.stringify(apiResponse.body));
        });
    });
});

When ('I send POST request with valid request payload, with token as {string}', token => {
    apiRequestBody = require('../../fixtures/api_data/create_gist/positive_payloads/CreateSecretGist.json');
    cy.request({
        method:'POST',
        url:apiEndpoint,
        body:apiRequestBody,
        failOnStatusCode: false,
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    }).then( (response) => {
        apiResponse = response;
    })
});

Then ('the response status code should be {int}', statusCode => {
    expect(apiResponse.status).to.eq(statusCode);
});

And ('the response should match the defined schema {string}', schemFilePath => {
    cy.fixture(schemFilePath).then((schema) => {
    // Compile the schema validation function
    const validate = ajv.compile(schema);

    // Perform the validation
    const valid = validate(apiResponse.body);

    // Assert the schema is valid
    expect(valid, JSON.stringify(validate.errors)).to.be.true;
    });
});

And ('the response should have public as {string}', gistType => {
    expect(String(apiResponse.body.public)).to.eq(gistType);
});