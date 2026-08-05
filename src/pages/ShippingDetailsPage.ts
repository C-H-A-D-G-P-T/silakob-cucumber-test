import { expect, Page, Locator } from '@playwright/test';

export class ShippingDetailsPage {
	readonly phoneNumberInput: Locator;
	readonly streetInput: Locator;
	readonly cityInput: Locator;
	readonly countryInput: Locator;
	readonly submitOrderBtn: Locator;

	constructor(private page: Page) {
		this.phoneNumberInput = page.locator('#phone');
		this.streetInput = page.locator('input[name="street"]');
		this.cityInput = page.locator('input[name="city"]');
		this.countryInput = page.locator('#countries_dropdown_menu');
		this.submitOrderBtn = page.locator('#submitOrderBtn');
	}

	async inputShippingDetails(shippingDetails: any) {
		const phoneNumber: string = shippingDetails.phone_number;
		const street: string = shippingDetails.street;
		const city: string = shippingDetails.city;
		const country: string = shippingDetails.country;

		await this.phoneNumberInput.fill(phoneNumber);
		await this.streetInput.fill(street);
		await this.cityInput.fill(city);

		if (country) {
			await this.countryInput.selectOption({ label: country });
		}
	}

	async submitOrder() {
		await this.submitOrderBtn.click();
	}

	async verifySubmitOrder({ isSuccess = true } = {}) {
		if (isSuccess) {
			await expect(this.page.locator('#message', { hasText: 'Congrats!' })).toBeVisible();
		} else {
			await expect(this.phoneNumberInput).toBeVisible();
			await expect(this.streetInput).toBeVisible();
			await expect(this.cityInput).toBeVisible();
			await expect(this.countryInput).toBeVisible();
			await expect(this.submitOrderBtn).toBeVisible();
			await expect(this.page.locator('#message', { hasText: 'Congrats!' })).not.toBeVisible();
		}
	}
}
