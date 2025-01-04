/* eslint-disable */
import { Given, When, Then} from 'cypress-cucumber-preprocessor/steps';
import { BASE_URL, BEARER_TOKEN } from '../../support/constants';

let getGistsAPIEndpoint: string;
let getGistsAPIResponse: any;
let deleteGistsAPIEndpoint: string;
let deleteGistsAPIResponse: any;
let gistID: any;

Given ('the API endpoint for get all public Gists', () => {
    getGistsAPIEndpoint = BASE_URL + '/gists'
});

When ('I send GET request without any token', () => {
    cy.request({
        method:'get',
        url:getGistsAPIEndpoint,
        failOnStatusCode:false
    }).then((response) => {
        getGistsAPIResponse = response;
        cy.log(JSON.stringify(getGistsAPIResponse));
        gistID = getGistsAPIResponse.body[0].id;
        cy.log('gistID is ' + gistID);
    });
});

Then ('the response status should be 200', () => {
    expect(getGistsAPIResponse.status).eq(200);
});

Given ('the API endpoint for deleting a gist', () => {
    deleteGistsAPIEndpoint = BASE_URL + '/gists/' + gistID
});

When ('I send DELETE request with current users AuthToken', () => {
    cy.request({
        method:'DELETE',
        url:deleteGistsAPIEndpoint,
        failOnStatusCode: false,
        headers: {
            'Authorization' : 'Bearer ' + BEARER_TOKEN
        }
    }).then((response) => {
        deleteGistsAPIResponse = response;      
    });
});

Then ('the response status should be 403 forbidden', () => {
    expect(deleteGistsAPIResponse.status).eq(403);
});


