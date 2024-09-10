import { IWorldOptions, setDefaultTimeout, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page, PlaywrightTestConfig } from '@playwright/test';
import { HomePage } from './page_objects/homepage.po';
export class TestWorld extends World {
	browser!: Browser;
	context!: BrowserContext;
	page!: Page;
	homePage!: HomePage;
	playwrightConf: PlaywrightTestConfig;

	constructor(opts: IWorldOptions) {
		super(opts);

		this.playwrightConf = {
			use: {
				screenshot: 'only-on-failure',
				headless: this.parameters.headless
			},
			timeout: 10000,
			snapshotDir: './e2e/results/screenshots'
		};
	}
	async init() {
		const { timeout, use } = this.playwrightConf;

		this.browser = await chromium.launch({ headless: use?.headless, timeout });
		this.context = await this.browser.newContext();
		this.page = await this.context.newPage();

		this.homePage = new HomePage(this);

		await this.page.goto(this.parameters.appUrl);
		await this.page.waitForLoadState('networkidle');
	}
	async destroy() {
		await this.page?.close();
		await this.context?.close();
		await this.browser?.close();
	}
}

setWorldConstructor(TestWorld);
setDefaultTimeout(30000);
