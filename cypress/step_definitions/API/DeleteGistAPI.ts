/* eslint-disable */
import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL, BEARER_TOKEN } from '../../support/constants';

let getGistsAPIEndpoint: string;
let deleteGistsAPIEndpoint: string;
let gistsID: string;

Given ('the API endpoint for get all public Gists', () => {
    getGistsAPIEndpoint = BASE_URL + '/gists/public'
});

When ('I send GET request without any token', () => {
    cy.apiRequest('GET', getGistsAPIEndpoint);
    cy.get('@apiResponse').then((response) => {
        const res = response as unknown as Cypress.Response<any>;
        gistsID = res.body[0].id;
        cy.log('gistID is ' + gistsID);
    }); 
});

Given('the API endpoint to delete a Gist', () => {
    deleteGistsAPIEndpoint = BASE_URL + '/gists/' + gistsID;
});

When ('I send DELETE request with current users AuthToken', () => {
    cy.apiRequest('DELETE', deleteGistsAPIEndpoint, BEARER_TOKEN);
});
