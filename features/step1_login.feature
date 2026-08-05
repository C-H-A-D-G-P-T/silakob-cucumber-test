Feature: Step 1 : Login
    As a customer of the shop
    I want to log in to my account
    So that I can start shopping for products

    Background:
        Given I am on the Login page

    @positive @login @step1
    Scenario: Login successfully with valid credentials
        When I login with email "admin@admin.com" and password "admin123"
        Then I should be successfully logged in and landed to Homepage

    @negative @login @step1
    Scenario Outline: Login failed with invalid credentials
        When I login with email "<email>" and password "<password>"
        Then I should see a login error message "<error_message>"
        Examples:
            | email           | password  | error_message                                                        |
            | admin@admin     | admin123  | Bad credentials! Please try again! Make sure that you've registered. |
            | admin@admin.com | admin1234 | Bad credentials! Please try again! Make sure that you've registered. |
            | user@admin.com  | admin123  | Bad credentials! Please try again! Make sure that you've registered. |
            | user@admin.com  | admin1234 | Bad credentials! Please try again! Make sure that you've registered. |
            | admin@admin.com |           | Bad credentials! Please try again! Make sure that you've registered. |
            |                 | admin123  | Bad credentials! Please try again! Make sure that you've registered. |