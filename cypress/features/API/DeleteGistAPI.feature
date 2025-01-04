Feature: Delete a Gist via API

Scenario: Get list of gists that have public public
  Given the API endpoint for get all public Gists
  When I send GET request without any token
  Then the response status should be 200

Scenario: Delete a public gist using current user AuthToken
   Given the API endpoint for deleting a gist
   When I send DELETE request with current users AuthToken
   Then the response status should be 403 forbidden