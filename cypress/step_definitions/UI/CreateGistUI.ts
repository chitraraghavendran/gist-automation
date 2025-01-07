/* eslint-disable */
import { And, Given, Then } from 'cypress-cucumber-preprocessor/steps';
import { GitHub_URL, GITHUB_USERNAME, GITHUB_PASSWORD } from '../../support/constants';
import CommonPOM from '../pageObjects/CommonPOM';
import NewGistPage from '../pageObjects/CreateGistUIPOM';
import { faker } from '@faker-js/faker';

Given ('the user logs in to the GitHub Page', () => {
    cy.visit(GitHub_URL);
    cy.get(CommonPOM.gitHublogin).type(GITHUB_USERNAME);
    cy.get(CommonPOM.gitHubPassword).type(GITHUB_PASSWORD);
    cy.get(CommonPOM.gitHubSignin).click();
    cy.wait(5000);
});

Then ('user clicks on the New gist option from plus symbol', () => {
    cy.get(CommonPOM.gitHubGobalCreateMenu).should('be.visible').click();
    cy.contains('span',NewGistPage.gitHubNewGist).should('be.visible').click();
});

Then ('user provides Gist description', () => {
    cy.get(NewGistPage.gistDescriptionFeild).type(NewGistPage.gistDescription);
});

And ('user provides Filename including extension', () => {
    cy.get(NewGistPage.gistFilenameField).type(NewGistPage.gistFilename);
});

Then ('user provides the content of that file', () => {
    cy.get(NewGistPage.gistContentFeild).type(NewGistPage.gistContent);
});

Then ('user clicks on dropdown option beside create secret gist', () => {
    cy.get(NewGistPage.gistviewtypeoptions).click();
    cy.get(NewGistPage.gistPublic).eq(1).click();
});

Then ('user clicks on create {string} gist option', () => {
    cy.get(NewGistPage.gistViewSubmit).click();
});

Then ('user adds multiple files and contents by clicking on add file option', () => {
    Cypress._.times(2, () => {
        cy.get(NewGistPage.gistAddFile).click();
    });
    Cypress._.times(3, (index: number) => {
        const randomFileName = `${faker.system.fileName()}-${Date.now()}`;
        const randomContent = faker.lorem.sentence();
        cy.get(NewGistPage.gistFilenameField).eq(index).type(randomFileName);
        cy.get(NewGistPage.gistContentFeild).eq(index).type(randomContent);
    });
});
