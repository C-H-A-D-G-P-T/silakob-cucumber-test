import { Given, When, Then } from '@cucumber/cucumber';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

let scenarioContext: any = {};

Given('I am on the Homepage', async function () {
	const loginPage = new LoginPage(this.page);

	await loginPage.navigate()
	await loginPage.login('admin@admin.com', 'admin123');
	await loginPage.verifyLoginSuccessful();
});

When('I add the following items to cart:', { timeout: 30000 }, async function (dataTable) {
	const homePage = new HomePage(this.page);
	const items: any[] = dataTable.hashes();

	scenarioContext.addedItem = items;

	await homePage.addItem(items);
});

Then('I should see added item in my cart', async function () {
	const homePage = new HomePage(this.page);
	await homePage.verifyCartItem(scenarioContext.addedItem);
});

Then('Total cost is calculated correctly', async function () {
	const homePage = new HomePage(this.page);
	await homePage.calcTotalCost(scenarioContext.addedItem);
});

Then('Proceed to checkout button will be enabled', async function () {
	const homePage = new HomePage(this.page);
	await homePage.verifyCheckoutBtnEnabled();
});

Then('I clicks on Proceed to checkout button', async function () {
	const homePage = new HomePage(this.page);
	await homePage.clickCheckoutBtn();
});
