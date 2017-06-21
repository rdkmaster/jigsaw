// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');

var BROWSER_OPTIONS = {
    LocalChrome: {
        'browserName': 'chrome',
    },
    ChromeOnTravis: {
        browserName: 'chrome',
        chromeOptions: {
            'args': ['--no-sandbox'],
            'binary': process.env.CHROME_BIN,
        }
    }
};

exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        './e2e/**/*.e2e-spec.ts'
    ],
    capabilities: process.env.TRAVIS ? BROWSER_OPTIONS.ChromeOnTravis : BROWSER_OPTIONS.LocalChrome,
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
