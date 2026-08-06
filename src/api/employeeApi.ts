import { Given, When, Then } from '@cucumber/cucumber';
import { APIRequestContext } from '@playwright/test';

/*
Background:
Given I set the API endpoint to "/api/v1/employees"

@api @positive
Scenario: Create a new employee with valid data should return 201
Given I have valid employee data with:
    | firstName | John                 |
    | lastName  | Doe                  |
    | dob       | 1999-08-20           |
    | email     | john.doe@example.com |
When I send a POST request to create the employee
Then the response status should be 201
And the response body should contain the employee ID
And the response body should contain the employee details
And the employee should be saved in the database

@api @negative
Scenario: Create employee with invalid email format should return 400
Given I have valid employee data with:
    | firstName | John          |
    | lastName  | Doe           |
    | dob       | 1999-08-20    |
    | email     | john.doe@.com |
When I send a POST request to create the employee
Then the response status should be 400
And the error message should be "must be a well-formed email address"
And the validation error should be for field "email"
*/

export class EmployeeApi {
	private request: APIRequestContext;

	constructor(apiContext: APIRequestContext) {
		this.request = apiContext;
	}

	async createEmployee(requestBody: any) {
		return await this.request.post('/api/v1/employees', {
			data: requestBody,
		});
	}

	async getEmployee(id: string) {
		return await this.request.get(`/api/v1/employees/${id}`);
	}
}
