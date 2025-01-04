/* eslint-disable */
import { And, Given, Then } from 'cypress-cucumber-preprocessor/steps';
import { GitHub_URL } from '../../support/constants';

Given ('the user logs in to the GitHub Page', () => {
    cy.visit(GitHub_URL);
    cy.get('input[id="login_field"]').type('chitraraghavendran.1991@gmail.com');
    cy.get('input[id="password"]').type('');
    cy.get('input[data-signin-label="Sign in"]').click();
});

Then ('user clicks on the New gist option from plus symbol', () => {
    cy.get('button[id="global-create-menu-anchor"]').click();
    cy.contains('span','New gist').should('be.visible').click();
});

Then ('user provides Gist description', () => {
    cy.get('input[name="gist[description]"]').type('AutomatedGist');
});

And ('user provides Filename including extension', () => {
    cy.get('input[placeholder="Filename including extension…"]').type('AutomatedFile.json');
});

Then ('user provides the content of that file', () => {
    cy.get('div[class="CodeMirror-sizer"]').type('AutomatedGistContent');
});

Then ('user clicks on dropdown option beside create secret gist', () => {
    cy.get('summary[aria-label="Select a type of Gist"]').click();
});

Then ('user clicks on create public gist option', () => {
    cy.get('label[class="select-menu-item"]').eq(1).click();
    cy.get('button.hx_create-pr-button.js-sync-select-menu-button.btn-primary.btn.BtnGroup-item').click();
});
