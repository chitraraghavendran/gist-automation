Feature: Update Gists via API

Scenario: Update a specified gist using gistid
Given I create a Gist to get gistid and contruct a update API
When I send PATCH request using above constructed endpoint
Then the response status code should be 200
And the response should match the defined schema "api_data/patch_gist/PATCHAPIResponseScheme.json"
Then the response should contain property "files.GA1_File_1.filename" and it should equal to "GA1_File_1"
Then the response should contain property "files.GA1_File_1_new_add.filename" and it should equal to "GA1_File_1_new_add"
Then the created gist is deleted at the end

Scenario: Update a specified gist using gistid
Given I get a gist from public gists list and fetch gistid and contruct a update API
When I send PATCH request using above constructed endpoint
Then the response status code should be 200
And the response should match the defined schema "api_data/patch_gist/PATCHAPIResponseScheme.json"
Then the response should contain property "files.GA1_File_1.filename" and it should equal to "GA1_File_1"
Then the response should contain property "files.GA1_File_1_new_add.filename" and it should equal to "GA1_File_1_new_add"
Then the created gist is deleted at the end