import {browser, by, element, ExpectedConditions} from 'protractor';

describe('button', () => {
    describe('button render', () => {
        beforeEach(() => browser.get('/demo/button'));

        it('should render button', async () => {
            expect(element(by.css('app-root .demo-wrap .right-box rdk-button')).getText()).toEqual('click me');
        });
    });
});
