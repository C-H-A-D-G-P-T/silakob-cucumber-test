Feature: Step 3 : Shipping Details
    As a customer of the shop
    I want to provide shipping details
    So that I can submit the order

    Background:
        Given I am on the Login page
        Then I login with email "admin@admin.com" and password "admin123"
        And I should be successfully logged in and landed to Homepage
        Then I add the following items to cart:
            | item_name          | quantity |
            | Dior J'adore       | 2        |
            | Gucci Bloom Eau de | 3        |
        And I should see added item in my cart
        Then Total cost is calculated correctly
        And Proceed to checkout button will be enabled
        Then I clicks on Proceed to checkout button

    @positive @shippingDetails @step3
    Scenario:  Input all required fields
        When I input the following shipping details:
            | phone_number | 0984277737 |
            | street       | Ramintra   |
            | city         | Bangkok    |
            | country      | Thailand   |
        Then I should submit order successfully

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