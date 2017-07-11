import {browser, by, element} from 'protractor';

describe('button', () => {
    describe('button render and set disabled', () => {
        beforeEach(() => {
            browser.waitForAngularEnabled(false);
            browser.get('/button/disable');
        });

        it('should render a button', async () => {
            expect(element(by.id('button')).getText()).toEqual('click me');
            const size = await element(by.id('button')).getSize();
            expect(size.width).toEqual(80);
            expect(size.height).toEqual(28);
        });

        it('should the button click invalid when set disabled', () => {
            const clickCountSpan = element(by.id('clickCount'));

            expect(clickCountSpan.getText()).toEqual('0');

            element(by.id('button')).click();
            expect(clickCountSpan.getText()).toEqual('1');

            expect(element(by.css('.demo-content .jigsaw-button-disabled')).isPresent()).toBeFalsy();
            element(by.id('toggleDisable')).click();
            expect(element(by.css('.demo-content .jigsaw-button-disabled')).isPresent()).toBeTruthy();

            element(by.id('toggleDisable')).click();
            element(by.id('button')).click();
            expect(clickCountSpan.getText()).toEqual('2');
        })

    });
});
