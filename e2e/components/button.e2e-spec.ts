import {browser, by, element, ExpectedConditions} from 'protractor';

describe('button', () => {
    describe('button render', () => {
        beforeEach(() => {
            browser.waitForAngularEnabled(false);
            browser.get('/demo/button');
        });

        it('should render a button', async () => {
            expect(element(by.css('.demo-wrap .right-box rdk-button')).getText()).toEqual('click me');
        });
    });
});
