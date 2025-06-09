Feature: Invalid URL

  Background:
    Given I open an invalid URL

  Scenario: User opens an invalid link
    Then I should see "Page not found" in the title
