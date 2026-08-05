import { Given, When, Then } from '@cucumber/cucumber';
import { HomePage } from '../pages/HomePage';

let scenarioContext: any = {};

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
