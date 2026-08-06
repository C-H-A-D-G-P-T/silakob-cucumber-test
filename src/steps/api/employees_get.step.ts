import { Given, When, Then } from '@cucumber/cucumber';
import { EmployeeApi } from '../../api/employeeApi';
import { expect } from 'playwright/test';

Given('I have an existing employee with ID {string}', async function (id: string) {
	this.employeeId = id;
});

Given('I have an employee ID that does not exist {string}', async function (id: string) {
	this.employeeId = id;
});

When('I send a GET request to get the employee detail', async function () {
	const employeeAPI = new EmployeeApi(this.apiContext);

	this.response = await employeeAPI.getEmployee(this.employeeId);
});

Then('the response body should contain the message {string}', async function (errorMessage) {
	const responseText = await this.response.text();

	expect(responseText).toBe(errorMessage);
});
