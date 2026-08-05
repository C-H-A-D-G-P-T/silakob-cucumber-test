import { Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

let browser: Browser;

Before(async function () {
	// 1. สั่งเปิด Browser
	browser = await chromium.launch({
		headless: false,
		args: ['--start-maximized'],
	});

	// 2. สร้าง page โดยตรง (ใช้ viewport: null เพื่อให้ขยายเต็มจอ)
	this.page = await browser.newPage({ viewport: null });
});

After(async function () {
	// 3. ปิด Page และ Browser เมื่อรันเทสจบ
	await this.page?.close();
	await browser?.close();
});
