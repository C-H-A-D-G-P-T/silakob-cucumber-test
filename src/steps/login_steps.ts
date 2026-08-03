import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage';

Given('I am on the Login page', async function () {
	const loginPage = new LoginPage(this.page);
	await loginPage.navigate();
});

When('I login with email {string} and password {string}', async function (email, password) {
	const loginPage = new LoginPage(this.page);
	await loginPage.login(email, password);
});

Then('I should be successfully logged in and landed to Homepage', async function () {
	const loginPage = new LoginPage(this.page);
	await loginPage.verifyLoginSuccessful();
});

Then('I should see a login error message {string}', async function (msg) {
	const loginPage = new LoginPage(this.page);
	await loginPage.validateErrorMessage(msg);
});
