import { After, AfterStep, Before, ITestCaseHookParameter } from '@cucumber/cucumber';
import { TestWorld } from './world';
Before(async function (this: TestWorld) {
	await this.init();
});
AfterStep(async function (this: TestWorld, scenario: ITestCaseHookParameter) {
	if ((scenario.result?.status as any) === 'FAILED') {
		// take screenshots if switched on for errors
		if (this.playwrightConf.use?.screenshot !== 'off') {
			const filename =
				scenario.gherkinDocument.feature?.name.replaceAll(' ', '_') +
				'_' +
				scenario.pickle.name.replaceAll(' ', '_') +
				'.png';

			const buffer = await this.page.screenshot({
				path: `${this.playwrightConf.snapshotDir}/${filename}`
			});
			this.attach(buffer, 'image/png');
		}
	}
});
After(async function (this: TestWorld) {
	await this.destroy();
});
