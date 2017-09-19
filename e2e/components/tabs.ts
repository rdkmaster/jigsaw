import {browser, element, by, ExpectedConditions} from "protractor";

describe('tile', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test selectedItems', () => {
        beforeEach(() => {
            browser.get('/#/tag/basic');
        });
    });
});
