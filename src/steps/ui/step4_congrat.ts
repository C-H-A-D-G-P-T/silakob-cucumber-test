import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { ShippingDetailsPage } from '../../pages/ShippingDetailsPage';
import { CongratsPage } from '../../pages/CongratsPage';

let scenarioContext: any = {};

Given('I am on the Congrats page with the following shipping details:', async function (dataTable) {
	const loginPage = new LoginPage(this.page);

	await loginPage.navigate();
	await loginPage.login('admin@admin.com', 'admin123');
	await loginPage.verifyLoginSuccessful();

	const homePage = new HomePage(this.page);

	const items: any[] = [
		{ item_name: "Dior J'adore", quantity: '2' },
		{ item_name: 'Gucci Bloom Eau de', quantity: '3' },
	];
	await homePage.addItem(items);
	scenarioContext.totalPrice = await homePage.calcTotalCost(items);
	await homePage.verifyCheckoutBtnEnabled();
	await homePage.clickCheckoutBtn();

	const shippingDetailsPage = new ShippingDetailsPage(this.page);

	const shippingDetails: any = dataTable.rowsHash();
	scenarioContext.shippingDetails = shippingDetails;

	await shippingDetailsPage.inputShippingDetails(shippingDetails);
	await shippingDetailsPage.submitOrder();
});

When('I am on the Congrats page', async function () {
	const shippingDetailsPage = new ShippingDetailsPage(this.page);

	await shippingDetailsPage.verifySubmitOrder({ isSuccess: true });
});

Then('I should see the address being displayed correctly', async function () {
	const congratsPage = new CongratsPage(this.page);

	await congratsPage.validateAddressConcat(scenarioContext);
});
