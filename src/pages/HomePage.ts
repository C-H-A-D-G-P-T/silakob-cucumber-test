import { expect, Page, Locator } from '@playwright/test';

export class HomePage {
	constructor(private page: Page) {}

	// When I click add to cart for item "Dior J'adore" for 2 units
	// And I click add to cart for item "Gucci Bloom Eau de" for 3 units
	// Then I should see added item in my cart
	// And Total cost is calculated correctly
	// Then Proceed to checkout button will be enabled

	async addItem(items: any[]) {
		await expect(this.page.locator('.shop-item-details').first()).toBeVisible();

		const remainingItems: any[] = [...items];
		let currentPage: number = 1;

		while (remainingItems.length > 0) {
			// Check item found or not. If found, add it.
			for (let i = remainingItems.length - 1; i >= 0; i--) {
				const item = remainingItems[i];
				const itemName: string = item.item_name;
				const itemQty: string = item.quantity;

				const foundItem: boolean = await this.page.locator('.shop-item', { hasText: itemName }).isVisible();
				if (foundItem) {
					console.log(`${itemName} found on page ${currentPage}`);

					// add item
					await this.page.locator('.shop-item', { hasText: itemName }).locator('button').click();
					console.log(`${itemName} has been added to cart.`);

					// set qty
					await this.page.locator('.cart-row', { hasText: itemName }).locator('.cart-quantity-input').fill(itemQty);
					console.log(`${itemName} quantity has been set to ${itemQty}.`);

					// Click on any element to update total price
					await this.page.locator('.section-header').click();

					// remove item from remainingItems
					const index: number = remainingItems.indexOf(item);
					remainingItems.splice(index, 1);
				} else {
					console.log(`${itemName} NOT found on page ${currentPage}, keep finding next item`);
				}
			}
			// If target item still remain, goto next page
			if (remainingItems.length > 0) {
				currentPage++;
				await this.page.locator('//button[contains(text(), "Next")]').click();
				await this.page.waitForTimeout(500);
			}
		}
	}

	async verifyCartItem(items: any[]) {
		const itemCount: number = items.length;
		await expect(this.page.locator('.cart-items').locator('.cart-row')).toHaveCount(itemCount);

		for (const item of items) {
			const itemName: string = item.item_name;
			const itemQty: string = item.quantity;

			// Check item visibility in cart
			await expect(this.page.locator('.cart-row', { hasText: itemName })).toBeVisible();
			console.log(`${itemName} found in cart`);

			// ! Front-end is displaying quantity from Shadow Content and unable to access in headed runner
			// // Check item added quantity
			// // <div contenteditable="plaintext-only">2</div>
			// await expect(
			// 	this.page.locator('.cart-row', { hasText: itemName }).locator('.cart-quantity-input', { hasText: itemQty }),
			// ).toBeVisible();
			// console.log(`${itemName} quantity matches as expected (${itemQty})`);
		}
	}

	async calcTotalCost(items: any[]): Promise<string> {
		let expectedTotal: number = 0;

		for (const item of items) {
			const itemName: string = item.item_name;
			const itemQty: number = Number(item.quantity);

			const itemPrice = (await this.page.locator('.cart-row', { hasText: itemName }).locator('.cart-price').textContent()) ?? '$0.00';
			const parsedItemPrice = parseFloat(itemPrice.replace('$', ''));
			const calItemPrice = Number((parsedItemPrice * itemQty).toFixed(2));

			expectedTotal += calItemPrice;
		}

		const actualTotal = (await this.page.locator('.cart-total-price').textContent()) ?? '$0.00';
		const expectedTotalFormatted = `$${expectedTotal.toFixed(2)}`;
		expect(actualTotal).toBe(expectedTotalFormatted);

		console.log(`✅ Total price matches -- Expected: ${expectedTotalFormatted} | Actual: ${actualTotal}`);

		return actualTotal;
	}

	async verifyCheckoutBtnEnabled() {
		// ? Checkout button is always enabled.
		await expect(this.page.locator('.btn-purchase')).toBeEnabled();
		console.log('Proceed to checkout button is enabled.');
	}

	async clickCheckoutBtn() {
		await this.page.locator('.btn-purchase').click();
	}
}
