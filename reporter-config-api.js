const reporter = require('cucumber-html-reporter');

const options = {
	theme: 'bootstrap',
	jsonFile: 'reports/api-report/api-report.json',
	output: 'reports/api-report/api-report.html',
	reportSuiteAsScenarios: true,
	scenarioTimestamp: true,
	launchReport: false,
	metadata: {
		'Test Type': 'API Tests',
		'App Version': '1.0.0',
		'Test Environment': 'STAGING',
	},
};

reporter.generate(options);
