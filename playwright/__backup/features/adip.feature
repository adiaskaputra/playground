Feature: Olala

  Background:
    Given I am on the olala page

  Scenario: Olala page
    When I click the login button
    Then I should be redirected to the OAuth login page
    And the URL should contain "response_type=code"
    And the URL should contain "redirect_uri="
    And the URL should contain "client_id="
