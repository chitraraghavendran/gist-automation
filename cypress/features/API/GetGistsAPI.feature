Feature: Get Gists via API

Scenario: create a gist to get the gist id
Given I create a Gist to get gist id from the response

Scenario: Positive usecase - Get a specified gist by gistid
Given the API endpoint for get Gist
When I send GET request with valid gistId in the endpoint
Then the response status should be 200