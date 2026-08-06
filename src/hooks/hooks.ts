import { Before, After } from '@cucumber/cucumber';
import { chromium, Browser, request as playwrightRequest, APIRequestContext } from '@playwright/test';
import { EmployeeApi } from '../api/employeeApi';

let browser: Browser;
let apiContext: APIRequestContext;

Before(async function () {
	// 1. Open browser
	browser = await chromium.launch({
		headless: true,
	});

	// 2. Create page, viewport: null for fullscreen
	this.page = await browser.newPage({ viewport: null });

	// 3. Initialize API context (For API Tests)
	apiContext = await playwrightRequest.newContext({
		baseURL: 'http://localhost:8887',
		extraHTTPHeaders: {
			'Content-Type': 'application/json',
		},
	});
	this.apiContext = apiContext;
});

After(async function () {
	// 1. Close page and browser after run ended
	await this.page?.close();
	await browser?.close();

	// 2. Close API context
	if (this.apiContext) {
		await apiContext.dispose();
	}
});
