Feature: Step 3 : Shipping Details
    As a customer of the shop
    I want to submit the order
    So that I can see my shipping details

    Background:
        Given I am on the Congrats page with the following shipping details:
            | phone_number | 0984277737 |
            | street       | Ramintra   |
            | city         | Bangkok    |
            | country      | Thailand   |

    @positive @congrats @step4
    Scenario: The addess is displayed correctly by concat between Street, City - Country
        When I am on the Congrats page
        Then I should see the address being displayed correctly
