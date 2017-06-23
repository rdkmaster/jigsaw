// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');

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
    config.sauceUser = process.env['SAUCE_USERNAME'];
    config.sauceKey = process.env['SAUCE_ACCESS_KEY'];
    config.multiCapabilities = [
        {
            name: "chrome-tests",
            browserName: 'chrome',
            platform: 'Windows 7',
            shardTestFiles: true,
            maxInstances: 1,
            //'tunnel-identifier': process.env['TRAVIS_JOB_NUMBER'],
            //'build': process.env['TRAVIS_BUILD_NUMBER']
        },
        {
            name: "firefox-tests",
            browserName: 'firefox',
            platform: 'Windows 7',
            shardTestFiles: true,
            maxInstances: 1,
            //'tunnel-identifier': process.env['TRAVIS_JOB_NUMBER'],
            //'build': process.env['TRAVIS_BUILD_NUMBER']
        }
    ];
} else {
    config.capabilities = {
        browserName: 'chrome'
    }
}

exports.config = config;
