@regression @web
Feature: Example Website (https://example.com)

Scenario: FinishMe
   When I open the browser
   And I navigate to "https://example.com"
   And I click on the "More information..." link
   Then a link with text "RFC 2606" must be present 
   And a link with text "RFC 6761" must be present 
   And the "Domain Names" box must contain "Root Zone Management" at index "2"
