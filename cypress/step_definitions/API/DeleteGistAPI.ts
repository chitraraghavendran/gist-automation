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
    cy.apiRequestWithoutToken('GET', getGistsAPIEndpoint);
    cy.get('@apiResponse').then((response) => {
        const res = response as unknown as Cypress.Response<any>;
        gistsID = res.body[0].id;
        deleteGistsAPIEndpoint = BASE_URL + '/gists/' + gistsID;
        cy.log('gistID is ' + gistsID);
    }); 
});

When ('I send DELETE request with current users AuthToken', () => {
    cy.apiRequest('DELETE', deleteGistsAPIEndpoint, BEARER_TOKEN);
});
