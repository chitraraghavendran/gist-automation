Feature: Create Gist via API

Scenario: Positive usecase - creating a public Gist via POST request
  Given the API endpoint for create Gist
  When I send POST request with request payload as "fixtures/api_data/create_gist/positive_payloads/CreatePublicGist.json"
  Then the response status code should be 201
  And the response should have public as "true"


Scenario: Positive usecase - creating a secret Gist via POST request
  Given the API endpoint for create Gist
  When I send POST request with request payload as "fixtures/api_data/create_gist/positive_payloads/CreateSecretGist.json"
  Then the response status code should be 201
  And the response should have public as "false"


Scenario Outline: Negative testcase - creating Gist with multiple invalid tokens
  Given the API endpoint for create Gist
  When I send POST request with valid request payload, with token as "<token>"
  Then the response status code should be 401
  Examples:
   |    token    |
   |             |
   | dummy_token |
 

Scenario Outline: Negative testcase - creating Gist with invalid request payload
  Given the API endpoint for create Gist
  When I send POST request with request payload as "<requestBody>"
  Then the response status code should be 422
  Examples:
   |                     requestBody                                                      |
   | fixtures/api_data/create_gist/negative_payloads/EmptyFiles.json                      |
   | fixtures/api_data/create_gist/negative_payloads/EmptyPayload.json                    |
   | fixtures/api_data/create_gist/negative_payloads/InvalidDataType.json                 |
   | fixtures/api_data/create_gist/negative_payloads/LargeContent.json                    |
   | fixtures/api_data/create_gist/negative_payloads/MissingContent.json                  |
   | fixtures/api_data/create_gist/negative_payloads/MultipleFilesWithSameNames.json      |
   | fixtures/api_data/create_gist/negative_payloads/WithoutFiles.json                    |