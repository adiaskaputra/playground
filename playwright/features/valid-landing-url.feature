Feature: Valid Landing URL

  Background:
    Given I open an valid landing URL

  Scenario: User opens a valid landing link
    Then I should see the QR code with the branch.io link
