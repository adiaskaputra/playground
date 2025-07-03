Feature: Expired URL

  Background:
    Given I open an expired URL

  Scenario: User opens an expired link
    Then I should see "Your application has expired" in the title
