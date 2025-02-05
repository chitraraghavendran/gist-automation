Feature: Create Gist via API

Scenario Outline: Positive usecase - creating a public Gist via POST request
  Given the API endpoint for create Gist
  When I send POST request with request payload as "<requestBodyFilePath>"
  Then the response status code should be 201
  And the response should have public as "<publicViewType>"
  And the response should match the defined schema "api_data/create_gist/ResponseSchema.json"
  Then the created gist is deleted at the end
  Examples:
   |                            requestBodyFilePath                          | publicViewType |
   |    api_data/create_gist/positive_payloads/CreatePublicGist.json         | true           |
   |    api_data/create_gist/positive_payloads/CreateSecretGist.json         | false          |
   |    api_data/create_gist/positive_payloads/HugeFileName.json             | true           |


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
  When I send POST request with request payload as "<requestBodyFilePath>"
  Then the response status code should be 422
  Examples:
   |                     requestBodyFilePath                                     |
   | api_data/create_gist/negative_payloads/EmptyFiles.json                      |
   | api_data/create_gist/negative_payloads/EmptyPayload.json                    |
   | api_data/create_gist/negative_payloads/InvalidDataType.json                 |
   | api_data/create_gist/negative_payloads/MissingContent.json                  |
   | api_data/create_gist/negative_payloads/MultipleFilesWithSameNames.json      |
   | api_data/create_gist/negative_payloads/WithoutFiles.json                    |