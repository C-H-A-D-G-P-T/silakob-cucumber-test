import { Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

let browser: Browser;

Before(async function () {
	// 1. สั่งเปิด Browser
	browser = await chromium.launch({ headless: false }); // ตั้งเป็น true ถ้าไม่ต้องการให้เด้งหน้าต่าง
	const context = await browser.newContext();

	// 2. สร้าง page แล้วเอาไปใส่ไว้ใน this.page ของ Cucumber World
	this.page = await context.newPage();
});

// After(async function () {
// 	// 3. ปิด Page และ Browser เมื่อรันเทสจบ
// 	await this.page?.close();
// 	await browser?.close();
// });
