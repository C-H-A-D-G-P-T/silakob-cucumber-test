import { Given, When, Then } from '@cucumber/cucumber';
import { EmployeeApi } from '../../api/employeeApi';
import { expect } from 'playwright/test';

Given('I have an employee data with:', async function (employeeData) {
	this.employeeData = employeeData.rowsHash();
});

When('I send a POST request to create the employee', async function () {
	const employeeAPI = new EmployeeApi(this.apiContext);

	const requestBody: any = this.employeeData;
	this.response = await employeeAPI.createEmployee(requestBody);
});

Then('the error message should be {string}', async function (defaultMessage: string) {
	const responseJson: any = await this.response.json();
	const actualDefaultMessage: string = responseJson.errors[0].defaultMessage;

	expect(actualDefaultMessage).toBe(defaultMessage);
});
