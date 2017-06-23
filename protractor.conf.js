// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');

let config = {
    allScriptsTimeout: 11000,
    specs: [
        './e2e/**/*.e2e-spec.ts'
    ],
    capabilities: {
        'browserName': 'chrome',
    },
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function () {
        }
    },
    beforeLaunch: function () {
        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json'
        });
    },
    onPrepare() {
        jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
    }
};

if (process.env['TRAVIS']) {
    config.sauceUser = process.env['SAUCE_USERNAME'];
    config.sauceKey = process.env['SAUCE_ACCESS_KEY'];
    config.capabilities = {
        'browserName': 'chrome',
        'version': 'latest',
        'chromedriverVersion': '2.28',
        'tunnel-identifier': process.env['TRAVIS_JOB_NUMBER'],
        'build': `TRAVIS #${process.env['TRAVIS_BUILD_NUMBER']} (${process.env['TRAVIS_BUILD_ID']})`,
        'name': 'Jigsaw E2E Tests',

        // Enables concurrent testing in the Webdriver. Currently runs five e2e files in parallel.
        'maxInstances': 5,
        'shardTestFiles': true,

        // By default Saucelabs tries to record the whole e2e run. This can slow down the builds.
        'recordVideo': false,
        'recordScreenshots': false,
        'chromeOptions': {
            args: ["--headless", 'no-sandbox', "--disable-gpu", "--window-size=800x600"]
        }
    };
}

exports.config = config;
