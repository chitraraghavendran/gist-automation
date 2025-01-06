Feature: Create Gist via UI

Scenario: Positive usecase - creating a public Gist
Given the user logs in to the GitHub Page
Then user clicks on the New gist option from plus symbol
Then user provides Gist description
And user provides Filename including extension
Then user provides the content of that file                           
Then user clicks on dropdown option beside create secret gist                                                                               
Then user clicks on create "public" gist option

Scenario: Positive usecase - creating a Secret Gist
Given the user logs in to the GitHub Page
Then user clicks on the New gist option from plus symbol
Then user provides Gist description
And user provides Filename including extension
Then user provides the content of that file                           
Then user clicks on create "secret" gist option

Scenario: Positive usecase - create gist with multiple files
Given the user logs in to the GitHub Page
Then user clicks on the New gist option from plus symbol
Then user provides Gist description
And user provides Filename including extension
Then user provides the content of that file  
Then user adds multiple files and contents by clicking on add file option         
Then user clicks on create "secret" gist option
