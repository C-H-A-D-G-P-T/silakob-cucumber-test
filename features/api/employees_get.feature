Feature: Get Employee by ID - GET /api/v1/employees/{id}

    Background:
        Given I set the API endpoint to "/api/v1/employees"

    @api @positive
    Scenario: Get existing employee by ID should return 200
        Given I have an existing employee with ID "1"
        When I send a GET request to get the employee detail
        Then the response status should be 200

    @api @negative
    Scenario: Get non-existent employee by ID should return 404
        Given I have an employee ID that does not exist "99999"
        When I send a GET request to get the employee detail
        Then the response status should be 404
        And the response body should contain the message "Employee not found with ID 99999"