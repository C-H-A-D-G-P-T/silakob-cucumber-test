import { expect, Page, Locator } from '@playwright/test';

export class LoginPage {
	readonly url: string;
	readonly emailInput: Locator;
	readonly passwordInput: Locator;
	readonly submitBtn: Locator;
	readonly errorMsg: Locator;
	readonly homepageHeader: Locator;

	constructor(private page: Page) {
		this.url = 'https://qa-practice.razvanvancea.ro/auth_ecommerce.html';
		this.emailInput = page.locator('#email');
		this.passwordInput = page.locator('#password');
		this.submitBtn = page.locator('#submitLoginBtn');
		this.errorMsg = page.locator('.alert');
		this.homepageHeader = page.locator('.section-header');
	}

	async navigate() {
		await this.page.goto(this.url);
	}

	async login(email: string, password: string) {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
		await this.submitBtn.click();
	}

	async verifyLoginSuccessful() {
		await expect(this.homepageHeader).toBeVisible();
		await expect(this.homepageHeader).toHaveText('SHOPPING CART');
	}

	async validateErrorMessage(msg: string) {
		await expect(this.errorMsg).toHaveText(msg);
	}
}
