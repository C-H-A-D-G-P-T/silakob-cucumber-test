const reporter = require('cucumber-html-reporter');

const options = {
	theme: 'bootstrap',
	jsonFile: 'reports/ui-report/ui-report.json',
	output: 'reports/ui-report/ui-report.html',
	reportSuiteAsScenarios: true,
	scenarioTimestamp: true,
	launchReport: false,
	metadata: {
		'Test Type': 'UI Tests',
		'App Version': '1.0.0',
		'Test Environment': 'STAGING',
		Browser: 'Chromium',
	},
};

reporter.generate(options);
