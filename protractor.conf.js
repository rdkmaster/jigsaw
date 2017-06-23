// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');
const SauceLabs = require('saucelabs');

let config = {
    allScriptsTimeout: 11000,
    specs: [
        './e2e/**/*.e2e-spec.ts'
    ],
    //directConnect: true,
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
    const SAUCE_USERNAME = process.env['SAUCE_USERNAME'];
    const SAUCE_ACCESS_KEY = process.env['SAUCE_ACCESS_KEY'];
    let JOB_ID;
    //config.sauceUser = SAUCE_USERNAME;
    //config.sauceKey = SAUCE_ACCESS_KEY;
    config.multiCapabilities = [
        {
            name: "chrome-tests",
            browserName: 'chrome',
            platform: 'Windows 7',
            shardTestFiles: true,
            maxInstances: 1,
            username: SAUCE_USERNAME,
            accessKey: SAUCE_ACCESS_KEY,
            //'tunnel-identifier': process.env['TRAVIS_JOB_NUMBER'],
            //'build': process.env['TRAVIS_BUILD_NUMBER']
        },
        {
            name: "firefox-tests",
            browserName: 'firefox',
            platform: 'Windows 7',
            shardTestFiles: true,
            maxInstances: 1,
            username: SAUCE_USERNAME,
            accessKey: SAUCE_ACCESS_KEY,
            //'tunnel-identifier': process.env['TRAVIS_JOB_NUMBER'],
            //'build': process.env['TRAVIS_BUILD_NUMBER']
        }
    ];

    // Run for each capability
    config.onComplete=function () {
        // Get the session id and store it in the JOB_ID
        return browser.getSession()
            .then((session) => JOB_ID = session.getId());
    };
    // Run for each capability
    config.onCleanUp=function (exitCode) {
        const saucelabs = new SauceLabs({
            username: SAUCE_USERNAME,
            password: SAUCE_ACCESS_KEY
        });

        return new Promise((resolve, reject) => {
            // Connect to Sauce Labs and update the
            // job with the correct exit code status
            saucelabs.updateJob(JOB_ID, {passed: exitCode === 0},
                () => resolve(),
                (error) => reject('Error:', error));
        });
    }
} else {
    config.capabilities = {
        browserName: 'chrome'
    }
}

exports.config = config;
