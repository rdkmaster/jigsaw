import {browser, by, element, ExpectedConditions} from 'protractor';

describe('button', () => {
    describe('test disabled', () => {
        beforeEach(() => {
            browser.get('/button/disable');
        });

        it('should click invalid when set disabled', () => {
            const testButtonEl = element(by.id('test-button')),
                toggleDisabledEl = element(by.id('toggle-disabled')),
                clickCounterEl = element(by.id('click-counter'));

            expect(clickCounterEl.getText()).toEqual('0');

            testButtonEl.click();
            expect(clickCounterEl.getText()).toEqual('1');

            expect(element(by.css('.demo-content .jigsaw-button-disabled')).isPresent()).toBeFalsy();
            toggleDisabledEl.click();
            expect(element(by.css('.demo-content .jigsaw-button-disabled')).isPresent()).toBeTruthy();
            expect(testButtonEl.getCssValue('pointer-events')).toEqual('none');

            toggleDisabledEl.click();
            testButtonEl.click();
            expect(clickCounterEl.getText()).toEqual('2');
        })

    });

    describe('test width and height', () => {
        beforeEach(() => {
            browser.get('button/width_height');
        });

        it('should change size when set width and height', async () => {
            const size = await element(by.id('test-button')).getSize();
            expect(size.width).toEqual(300);
            expect(size.height).toEqual(40);
        })
    });

    describe('test preset', () => {
        beforeEach(() => {
            browser.get('button/preset');
        });

        it('should change size when set presize', async () => {
            let size;
            const testButton = element(by.id('test-button'));
            const presetList = element(by.id('preset-list')).all(by.tagName('jigsaw-button'));

            presetList.get(0).click();
            await browser.wait(ExpectedConditions.not(
                ExpectedConditions.presenceOf(element(by.css('.jigsaw-button-clicked')))));

            size = await testButton.getSize();
            expect(size.width).toEqual(80);
            expect(size.height).toEqual(20);

            presetList.get(1).click();
            await browser.wait(ExpectedConditions.not(
                ExpectedConditions.presenceOf(element(by.css('.jigsaw-button-clicked')))));
            size = await testButton.getSize();
            expect(size.width).toEqual(80);
            expect(size.height).toEqual(28);

            presetList.get(2).click();
            await browser.wait(ExpectedConditions.not(
                ExpectedConditions.presenceOf(element(by.css('.jigsaw-button-clicked')))));
            size = await testButton.getSize();
            expect(size.width).toEqual(80);
            expect(size.height).toEqual(36);
        })
    })
});
