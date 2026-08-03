Feature: Step 2 : Homepage - Shop
    As a customer of the shop
    I want to add item to cart
    So that I can proceed to checkout

    Background:
        Given I login with email "admin@admin.com" and password "admin123"
        And I should be successfully logged in and landed to Homepage

    @positive @addItem @step2
    Scenario: Add item(s) to cart successfully
        When I click add to cart for item "Dior J'adore" for 2 units
        And I click add to cart for item "Gucci Bloom Eau de" for 3 units
        Then I should see selected item in my cart
        And Total cost is calculated correctly
        Then Proceed to checkout button will be enabled