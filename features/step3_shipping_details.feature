Feature: Step 3 : Shipping Details
    As a customer of the shop
    I want to provide shipping details
    So that I can submit the order

    Background:
        Given I am on the Shipping Details page

    @positive @shippingDetails @step3
    Scenario:  Input all required fields
        When I input the following shipping details:
            | phone_number | 0984277737 |
            | street       | Ramintra   |
            | city         | Bangkok    |
            | country      | Thailand   |
        Then I submit order successfully

    @negative @shippingDetails @step3
    ### Use Scenario Outline with Placeholders ###
    ### Or we can use separated scenarios if the expected result is different ###
    Scenario Outline: Input some required fields
        When I input the following shipping details:
            | phone_number   | street   | city   | country   |
            | <phone_number> | <street> | <city> | <country> |
        Then I should not submit order successfully

        Examples:
            | phone_number | street   | city    | country  |
            | 0984277737   | Ramintra | Bangkok |          |
            | 0984277737   | Ramintra |         | Thailand |
            | 0984277737   |          | Bangkok | Thailand |
            |              | Ramintra | Bangkok | Thailand |