import {browser, by, element, ExpectedConditions} from 'protractor';
import {waitForNotPresence, waitForPresence} from "../utils/await";

describe('button', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test disabled', () => {
        beforeEach(() => {
            browser.get('/button/disabled');
        });

        it('should click invalid when set disabled', () => {
            const testButtonEl = element(by.id('test-button')),
                toggleDisabledEl = element(by.id('toggle-disabled')),
                clickCounterEl = element(by.id('click-counter'));
            browser.switchTo().defaultContent();

            expect(clickCounterEl.getText()).toBe('0');

            testButtonEl.click();
            expect(clickCounterEl.getText()).toBe('1');

            expect(element(by.css('.demo-content .jigsaw-button-disabled')).isPresent()).toBeFalsy();
            toggleDisabledEl.click();
            expect(testButtonEl.getCssValue('pointer-events')).toBe('none');//属性为none，则不会成为鼠标时间的target

            toggleDisabledEl.click();
            testButtonEl.click();
            expect(clickCounterEl.getText()).toBe('2');
        })
    });

    describe('test width and height', () => {
        beforeEach(() => {
            browser.get('/button/width-height');
        });

        it('should change size when set width and height', async () => {
            browser.switchTo().defaultContent();

            const size = await element(by.tagName('jigsaw-button')).getSize();
            expect(size.width).toBe(300);
            expect(size.height).toBe(40);
        })
    });


    describe('test preset size and type', () => {
        beforeEach(() => {
            browser.get('/button/preset');
        });

        it('should display different size when set presize', async () => {
            let size;
            const testButton = element(by.id('test-button'));
            const presizeList = element(by.id('presize-list')).all(by.tagName('jigsaw-button'));
            browser.switchTo().defaultContent();
            presizeList.get(0).click();
            await waitForPresence('.jigsaw-button-size-small');
            await waitForNotPresence('.jigsaw-button-clicked');
            size = await testButton.getSize();
            await expect(size.width).toBe(80);
            await expect(size.height).toBe(22);

            presizeList.get(1).click();
            await waitForNotPresence('.jigsaw-button-size-small');
            await waitForNotPresence('.jigsaw-button-clicked');
            size = await testButton.getSize();
            await expect(size.width).toBe(80);
            await expect(size.height).toBe(30);

            presizeList.get(2).click();
            await waitForPresence('.jigsaw-button-size-large');
            await waitForNotPresence('.jigsaw-button-clicked');
            size = await testButton.getSize();
            await expect(size.width).toBe(80);
            await expect(size.height).toBe(38);
        });

        it('should display different background when set type', async () => {
            browser.switchTo().defaultContent();
            const typeList = element(by.id('type-list')).all(by.tagName('jigsaw-button'));
            await waitForPresence('.jigsaw-button');
            await expect(typeList.get(0).getCssValue('background-color')).toBe('rgba(255, 255, 255, 1)');
            await expect(typeList.get(1).getCssValue('background-color')).toBe('rgba(65, 173, 220, 1)');
            await expect(typeList.get(2).getCssValue('background-color')).toBe('rgba(231, 143, 78, 1)');
            await  expect(typeList.get(3).getCssValue('background-color')).toBe('rgba(236, 109, 109, 1)');
        })
    })
});
