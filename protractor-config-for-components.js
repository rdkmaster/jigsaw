// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');

let config = {
    allScriptsTimeout: 11000,
    specs: [
        './e2e/components/movable.e2e-spec.ts'
    ],
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function () {
        }
    },
    /*
    //beforeLaunch在protractor里面执行一次，如果使用multiCapabilities，
    //tsconfig.json就不能放在beforeLaunch里面
    beforeLaunch: function () {
        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json'
        });
    },*/
    onPrepare() {
        jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json'
        });
    }
};

if (process.env['TRAVIS']) {
    config.sauceUser = process.env['SAUCE_USERNAME'];
    config.sauceKey = process.env['SAUCE_ACCESS_KEY'];
    config.multiCapabilities = [
        {
            browserName: 'chrome',
            version: 'latest',
            platform: 'Windows 7',
            shardTestFiles: true,
            'tunnel-identifier': process.env['TRAVIS_JOB_NUMBER'],
            'build': process.env['TRAVIS_BUILD_NUMBER']
        },
        {
            browserName: 'firefox',
            version: 'latest',
            platform: 'OS X 10.10',
            shardTestFiles: true,
            'tunnel-identifier': process.env['TRAVIS_JOB_NUMBER'],
            'build': process.env['TRAVIS_BUILD_NUMBER']
        }
    ];
} else {
    config.directConnect = true;
    config.multiCapabilities = [
        {
            browserName: 'chrome'
        },
        /*{
            browserName: 'firefox'
        }*/
    ];
}

exports.config = config;
