Feature: Get Gists via API

Scenario: Positive usecase - Get a specified gist by gistid
Given I create a Gist to get gist id from the response and contruct the API endpoint
When I send GET request using above constructed endpoint
Then the response status code should be 200
Then the response should have the property "files"
Then the response should have the property "owner.login"
Then the response should contain property "owner.login" and it should equal to "chitraraghavendran"

Scenario: Negetive usecase - Get a specified gist with invalid gistID
Given I construct endpoint with invalid gistID
When I send GET request using above constructed endpoint
Then the response status code should be 404

Scenario: Negetive usecase - Get a specified gist with invalid endpoint
Given I construct invalid endpoint
When I send GET request using above constructed endpoint
Then the response status code should be 404