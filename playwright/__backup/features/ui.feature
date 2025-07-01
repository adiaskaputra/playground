Feature: Landing Page QR and Deep Link

  Scenario: Display QR code and deep link button
    Given I open the landing page
    Then I should see a QR code
    And I should see a deep link button

  Scenario: Clicking the button should navigate to the deeplink URL
    Given I open the landing page
    When I click the deep link button
    Then I should be redirected to the deeplink URL

  Scenario: The QR code contains the correct deeplink
    Given I open the landing page
    When I extract the QR code image
    Then the QR code should contain the deeplink URL
