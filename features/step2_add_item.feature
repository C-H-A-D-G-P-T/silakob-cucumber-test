Feature: Step 2 : Homepage - Shop
    As a customer of the shop
    I want to add item to cart
    So that I can proceed to checkout

    Background:
        Given I am on the Login page
        Then I login with email "admin@admin.com" and password "admin123"
        And I should be successfully logged in and landed to Homepage

    @positive @addItem @step2
    Scenario: Add item(s) to cart successfully
        When I add the following items to cart:
            | item_name          | quantity |
            | Dior J'adore       | 2        |
            | Gucci Bloom Eau de | 3        |
        Then I should see added item in my cart
        And Total cost is calculated correctly
        Then Proceed to checkout button will be enabled