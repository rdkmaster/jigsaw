import {browser, element, by} from 'protractor';

export class Ng2RdkPage {
    navigateTo() {
        browser.waitForAngularEnabled(false);
        return browser.get('/');
    }

    getParagraphText() {
        return element(by.css('app-root .app-wrap header h4 a')).getText();
    }
}
