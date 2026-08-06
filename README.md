# silakob-cucumber-test

A Cucumber-based test automation framework using TypeScript, Playwright, and Cucumber.js.

## Project Structure

```
├── .github/                # GitHub Actions workflows and configuration
├── features/               # Cucumber feature files
│   ├── api/                # API-related feature files
│   └── ui/                 # UI-related feature files
├── reports/                # Generated JSON and HTML test reports
├── src/                    # Source code for step definitions and helper functions
│   ├── api/                # API clients and helpers
│   ├── hooks/              # Cucumber hooks (setup/teardown)
│   ├── pages/              # Page Object Model (POM) files for UI tests
│   └── steps/              # Step definitions matching feature files
├── cucumber.json           # Cucumber configuration file
├── package.json            # Node.js project settings and dependencies
├── reporter-config-api.js  # HTML reporter configuration for API tests
├── reporter-config-ui.js   # HTML reporter configuration for UI tests
└── tsconfig.json           # TypeScript configuration
```

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Install Playwright browsers**:
   ```bash
   npx playwright install
   ```

3. **Recommended VS Code Extension**:
   - [Cucumber Gherkin Full Support](https://marketplace.visualstudio.com/items?itemName=alexcreanza.cucumberautocomplete) or the official [Cucumber](https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official) extension for Gherkin syntax highlighting and step-definition matching.

## Running Tests

Below are the scripts available in [package.json](file:///Users/warit/Desktop/silakob-cucumber-test/package.json) to execute tests and generate reports:

### Basic Test Execution
- **Run all tests**:
  ```bash
  npm run test
  ```
- **Run parallel tests (4 workers)**:
  ```bash
  npm run test:parallel
  ```
- **Run tests by tag**:
  ```bash
  npm run test:positive
  npm run test:negative
  ```

### API Tests
- **Run API tests**:
  ```bash
  npm run test:api
  ```
- **Generate API HTML report**:
  ```bash
  npm run report:api
  ```
- **Run API tests and generate HTML report**:
  ```bash
  npm run test:api:html
  ```

### UI Tests
- **Run UI tests**:
  ```bash
  npm run test:ui
  ```
- **Generate UI HTML report**:
  ```bash
  npm run report:ui
  ```
- **Run UI tests and generate HTML report**:
  ```bash
  npm run test:ui:html
  ```

### All Tests with HTML Reports
- **Run all tests (API & UI)**:
  ```bash
  npm run test:all
  ```
- **Generate all reports**:
  ```bash
  npm run report:all
  ```
- **Run all tests and generate all HTML reports**:
  ```bash
  npm run test:all:html
  ```
