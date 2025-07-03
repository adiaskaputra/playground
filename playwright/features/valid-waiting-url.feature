Feature: Valid Waiting URL

  Background:
    Given I open an valid waiting URL

  Scenario: User opens a valid waiting link
    Then I should see "Redirecting you to complete your data sharing" in the title
    Then I should see the QR code with valid deeplink branch.io
    Then I should see the button Open Privy App
    When I click the button Open Privy App
    Then I should see the the fallback branch.io playstore or appstore
