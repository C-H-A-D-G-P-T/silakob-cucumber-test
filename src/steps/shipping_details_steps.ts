import { Given, When, Then } from '@cucumber/cucumber';
import { ShippingDetailsPage } from '../pages/ShippingDetailsPage';

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

Then('I should submit order successfully', async function () {
	const shippingDetailsPage = new ShippingDetailsPage(this.page);

	await shippingDetailsPage.submitOrder();
	await shippingDetailsPage.verifySubmitOrder({ isSuccess: true });
});

Then('I should not submit order successfully', async function () {
	const shippingDetailsPage = new ShippingDetailsPage(this.page);

	await shippingDetailsPage.submitOrder();
	await shippingDetailsPage.verifySubmitOrder({ isSuccess: false });
});
