import { Given, When, Then } from '@cucumber/cucumber';
import { ShippingDetailsPage } from '../../pages/ShippingDetailsPage';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

Given('I am on the Shipping Details page', async function () {
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
	await homePage.verifyCheckoutBtnEnabled();
	await homePage.clickCheckoutBtn();
});

When('I input the following shipping details:', async function (dataTable) {
	const shippingDetailsPage = new ShippingDetailsPage(this.page);

	try {
		const shippingDetails: any = dataTable.rowsHash();
		await shippingDetailsPage.inputShippingDetails(shippingDetails);
	} catch {
		const shippingDetails: any = dataTable.hashes();
		for (const details of shippingDetails) {
			await shippingDetailsPage.inputShippingDetails(details);
		}
	}
});

Then('I submit order successfully', async function () {
	const shippingDetailsPage = new ShippingDetailsPage(this.page);

	await shippingDetailsPage.submitOrder();
	await shippingDetailsPage.verifySubmitOrder({ isSuccess: true });
});

Then('I should not submit order successfully', async function () {
	const shippingDetailsPage = new ShippingDetailsPage(this.page);

	await shippingDetailsPage.submitOrder();
	await shippingDetailsPage.verifySubmitOrder({ isSuccess: false });
});
