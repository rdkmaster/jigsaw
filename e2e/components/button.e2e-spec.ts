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

            expect(clickCounterEl.getText()).toBe('0');

            testButtonEl.click();
            expect(clickCounterEl.getText()).toBe('1');

            expect(element(by.css('.demo-content .jigsaw-button-disabled')).isPresent()).toBeFalsy();
            toggleDisabledEl.click();
            expect(element(by.css('.demo-content .jigsaw-button-disabled')).isPresent()).toBeTruthy();
            expect(testButtonEl.getCssValue('pointer-events')).toBe('none');

            toggleDisabledEl.click();
            testButtonEl.click();
            expect(clickCounterEl.getText()).toBe('2');
        })

    });

    describe('test width and height', () => {
        beforeEach(() => {
            browser.get('button/width_height');
        });

        it('should change size when set width and height', async () => {
            const size = await element(by.id('test-button')).getSize();
            expect(size.width).toBe(300);
            expect(size.height).toBe(40);
        })
    });

    describe('test preset size and type', () => {
        beforeEach(() => {
            browser.get('button/preset');
        });

        it('should display different size when set presize', async () => {
            let size;
            const testButton = element(by.id('test-button'));
            const presizeList = element(by.id('presize-list')).all(by.tagName('jigsaw-button'));

            presizeList.get(0).click();
            await browser.wait(ExpectedConditions.not(
                ExpectedConditions.presenceOf(element(by.css('.jigsaw-button-clicked')))));

            size = await testButton.getSize();
            expect(size.width).toBe(80);
            expect(size.height).toBe(20);

            presizeList.get(1).click();
            await browser.wait(ExpectedConditions.not(
                ExpectedConditions.presenceOf(element(by.css('.jigsaw-button-clicked')))));
            size = await testButton.getSize();
            expect(size.width).toBe(80);
            expect(size.height).toBe(28);

            presizeList.get(2).click();
            await browser.wait(ExpectedConditions.not(
                ExpectedConditions.presenceOf(element(by.css('.jigsaw-button-clicked')))));
            size = await testButton.getSize();
            expect(size.width).toBe(80);
            expect(size.height).toBe(36);
        });

        it('should display different background when set type', () => {
            const typeList = element(by.id('type-list')).all(by.tagName('jigsaw-button'));

            expect(typeList.get(0).getCssValue('background-color')).toBe('rgba(255, 85, 1, 1)');
            expect(typeList.get(1).getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)');
            expect(typeList.get(2).getCssValue('background-color')).toBe('rgba(16, 142, 233, 1)');
        })
    })
});
