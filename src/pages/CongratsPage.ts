import { expect, Page, Locator } from '@playwright/test';

export class CongratsPage {
	readonly congratsText: Locator;

	constructor(private page: Page) {
		this.congratsText = page.locator('#message');
	}

	async validateAddressConcat(scenarioContext: any) {
		// Congrats! Your order of $9.99 has been registered and will be shipped to Ramintra, Bkk - Thailand.

		const shippingDetails: any = scenarioContext.shippingDetails;
		const street: string = shippingDetails.street;
		const city: string = shippingDetails.city;
		const country: string = shippingDetails.country;

		const totalPrice: string = scenarioContext.totalPrice;

		const expectedCongratsText = `Congrats! Your order of  ${totalPrice}  has been registered and will be shipped to ${street}, ${city} - ${country}.`;
		const actualCongratsText = await this.congratsText.textContent();

		expect(actualCongratsText).toBe(expectedCongratsText);
		console.log('Congrats text matches as expected.');
	}
}
