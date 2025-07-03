Feature: Valid Waiting URL

  Background:
    Given I open an valid waiting URL

  Scenario: User opens a valid waiting link
    Then I should see the QR code with the branch.io link & button open app
