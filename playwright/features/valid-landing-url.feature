Feature: Valid Landing URL

  Background:
    Given I open an valid landing URL

  Scenario: User opens a valid landing link
    Then I should see "Download and Confirm your application via Privy app" in the title
    Then I should see the QR code with valid deeplink
