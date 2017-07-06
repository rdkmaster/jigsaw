import {browser, by, element} from 'protractor';

describe('button', () => {
    describe('button render', () => {
        beforeEach(() => {
            browser.waitForAngularEnabled(false);
            browser.get('/button/basic');
        });

        it('should render a button', async () => {
            expect(element(by.css('.demo-wrap .right-box jigsaw-button')).getText()).toEqual('click me');
        });
    });
});
