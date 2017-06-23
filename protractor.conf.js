// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');

let config = {
    allScriptsTimeout: 11000,
    specs: [
        './e2e/**/*.e2e-spec.ts'
    ],
    maxSessions: 1,
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
    config.sauceUser = SAUCE_USERNAME;
    config.sauceKey = SAUCE_ACCESS_KEY;
    config.multiCapabilities = [
        {
            name: "chrome-tests",
            browserName: 'chrome',
            shardTestFiles: true,
            maxInstances: 1,
            'tunnel-identifier': process.env['TRAVIS_JOB_NUMBER'],
            'build': process.env['TRAVIS_BUILD_NUMBER'],
            username: SAUCE_USERNAME,
            accessKey: SAUCE_ACCESS_KEY,
        },
        {
            name: "firefox-tests",
            browserName: 'firefox',
            shardTestFiles: true,
            maxInstances: 1,
            'tunnel-identifier': process.env['TRAVIS_JOB_NUMBER'],
            'build': process.env['TRAVIS_BUILD_NUMBER'],
            username: SAUCE_USERNAME,
            accessKey: SAUCE_ACCESS_KEY,
        }
    ];
} else {
    config.capabilities = {
        browserName: 'chrome'
    }
}

exports.config = config;
