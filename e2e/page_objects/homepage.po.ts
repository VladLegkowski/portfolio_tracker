import { expect } from '@playwright/test';
import { TestWorld } from '../world';

export class HomePage {
	constructor(private world: TestWorld) {}

	async navigateTo(): Promise<void> {
		await this.world.page.goto(`${this.world.parameters.appUrl}`);
		await expect(this.world.page).toHaveURL(this.world.parameters.appUrl);
	}
}
