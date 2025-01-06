/* eslint-disable */
import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL, BEARER_TOKEN } from '../../support/constants';

let createApiEndpoint: string;
let createApiRequestBody: any;
let gistID: string;
let patchApiEndpoint: string;
let patchAPIRequestBody: any;
let getApiEndpoint: string;


Given ('I create a Gist to get gistid and contruct a update API', () => {
    createApiEndpoint = BASE_URL + '/gists';
    createApiRequestBody = 'api_data/create_gist/positive_payloads/CreatePublicGist.json'
    cy.apiRequest('POST', createApiEndpoint, BEARER_TOKEN, createApiRequestBody);
    cy.get('@apiResponse').then((response) => {
        const res = response as unknown as Cypress.Response<any>;
        gistID = res.body.id;
        patchApiEndpoint = BASE_URL + '/gists/' + gistID;
        cy.wrap('gistID').as('gistsID');
    });
});

Given ('I get a gist from public gists list and fetch gistid and contruct a update API', () => {
    getApiEndpoint = BASE_URL + '/gists/public';
    cy.apiRequest('GET', getApiEndpoint, BEARER_TOKEN);
    cy.get('@apiResponse').then((response) => {
        const res = response as unknown as Cypress.Response<any>;
        gistID = res.body[0].id;
        patchApiEndpoint = BASE_URL + '/gists/' + gistID;
        cy.wrap('gistID').as('gistsID');
    });
});

When ('I send PATCH request using above constructed endpoint', () => {
    patchAPIRequestBody = 'api_data/patch_gist/PatchPublicGistMultFiles.json';
    cy.apiRequest('PATCH',patchApiEndpoint,BEARER_TOKEN,patchAPIRequestBody);
});