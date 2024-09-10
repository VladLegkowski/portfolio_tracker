// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');
const resultsDir = path.join(__dirname, 'e2e/results');

/**
 * delete e2e/results dir if exists
 */
if (fs.existsSync(resultsDir)) {
	fs.rmSync(resultsDir, { recursive: true });
}
const common = {
	format: [
		'json:results/cucumber-report.json',
		'html:results/cucumber-report.html',
		'@cucumber/pretty-formatter'
	],
	requireModule: ['ts-node/register'],
	require: [path.join(__dirname, '**/*.ts')],
	paths: [path.join(__dirname, 'features/')],
	timeout: 30000,
	worldParameters: {
		headless: false,
		appUrl: process.env.APP_URL || 'http://localhost:5173',
		mockApiUrl: process.env.APP_URL || 'http://apimock:3000'
	}
};

const local = {
	...common
};

const ci = {
	...common,
	parallel: 5,
	worldParameters: {
		...common.worldParameters,
		headless: true
	}
};

const debug = {
	...common,
	mode: 'generate',
	paths: []
};

module.exports = {
	default: local,
	debug: debug,
	ci: ci
};
