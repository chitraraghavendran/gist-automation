/* eslint-disable */
import { And, Then } from 'cypress-cucumber-preprocessor/steps';
import Ajv from "ajv";
import addFormats from "ajv-formats";
import _ from 'lodash';  // Import Lodash for nested validation

const ajv = new Ajv();
addFormats(ajv); // Adding standard formats like "uri", "email", etc.

Then ('the response status code should be {int}', statusCode => {
    cy.get('@apiResponse').then(apiRes => {
        const res = apiRes as unknown as Cypress.Response<any>;
        expect(res.status).eq(statusCode);
    });
});

And ('the response should have public as {string}', gistType => {
    cy.get('@apiResponse').then(apiRes => {
        const res = apiRes as unknown as Cypress.Response<any>;
        expect(String(res.body.public)).to.eq(gistType);
    });
    
});

And ('the response should match the defined schema {string}', schemFilePath => {
    cy.get('@apiResponse').then(apiRes => {
        const res = apiRes as unknown as Cypress.Response<any>;
        cy.fixture(schemFilePath).then((schema) => {
            // Compile the schema validation function
            const validate = ajv.compile(schema);
        
            // Perform the validation
            const valid = validate(res.body);
        
            // Assert the schema is valid
            expect(valid, JSON.stringify(validate.errors)).to.be.true;
            });
    });  
});

Then ('the response should have the property {string}', (property) => {
    cy.get('@apiResponse').then((response) => {
        const res = response as unknown as Cypress.Response<any>;
    
        //Check for existence of the property
        const hasProperty = _.has(res.body, property);
        expect(hasProperty).to.be.true;
      });
});

// Validate nested response property value (Type Assertion Added)
Then('the response should contain property {string} and it should equal to {string}', (property: string, value: string) => {
    cy.get('@apiResponse').then((response) => {
      const res = response as unknown as Cypress.Response<any>;
  
      //Check for existence of the property
      const hasProperty = _.has(res.body, property);
      expect(hasProperty).to.be.true;
  
      //check the value of the property
      const actualValue = _.get(res.body, property);
      expect(actualValue?.toString()).to.eq(value);
    });
  });