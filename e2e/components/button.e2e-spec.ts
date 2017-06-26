import {browser, by, element} from 'protractor';

describe('button', () => {
    describe('button render', () => {
        beforeEach(() => {
            browser.waitForAngularEnabled(true);
            browser.get('/demo/button');
        });

        it('should render button', async () => {
            expect(element(by.css('app-root .demo-wrap .right-box rdk-button')).getText()).toEqual('click me');
        });
    });
});
