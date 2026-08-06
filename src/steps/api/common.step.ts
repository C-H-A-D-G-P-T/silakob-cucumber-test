import { Given, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';

Given('I set the API endpoint to {string}', async function (endpoint) {
	const enpoint: string = endpoint;
});

Then('the response status should be {int}', async function (statusCode: number) {
	expect(this.response.status()).toBe(statusCode);
	console.log(`The response status matches as expected: ${statusCode}`);
});
