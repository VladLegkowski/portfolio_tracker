import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { TestWorld } from '../world';

Given('I am on the homepage', async function (this: TestWorld) {
	await this.homePage.navigateTo();
	await expect(
		this.page.getByLabel('Login use search to find by ticker name / symbol')
	).toBeInViewport();
});
