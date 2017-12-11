import {browser, element, by,$, $$} from 'protractor';
import {waitForNotPresence, waitForPresence} from "../utils/await";
import {expectToExist} from "../utils/asserts";

describe('combo-select', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test basic function', () => {
        it('should display options  and auto width when mouse enter into combo', async () => {
            await browser.get('/combo-select/auto-width');
            const selectEl = element(by.tagName('jigsaw-combo-select')),
                buttons = $$('jigsaw-tile-option');
            browser.actions().mouseMove(selectEl).perform();
            expect(selectEl.getText()).toBe('北京');
            await waitForPresence('jigsaw-tile');
            buttons.get(1).click();
            expect(selectEl.getText()).toBe('北京 上海');
            buttons.get(0).click();
            expect(selectEl.getText()).toBe('上海');
            expect(selectEl.getCssValue('width')).toBe(element(by.tagName('jigsaw-tile')).getCssValue('width'));
        });
        it('should change trigger when click button', async () => {
            await browser.get('/combo-select/change-trigger');
            const selectEl = $('jigsaw-combo-select'),
                buttons = $$('jigsaw-button');
            browser.actions().mouseMove(selectEl).perform();
            await waitForPresence('.drop-down-container');
            expect(buttons.count()).toBe(10);
            expectToExist('.drop-down-container');
            browser.actions().mouseMove({x: 1000, y: 135}).perform();
            await waitForNotPresence('.drop-down-container');
            expectToExist('.drop-down-container',false);
            buttons.get(0).click();
            selectEl.click();
            await waitForPresence('.drop-down-container');
            expectToExist('.drop-down-container');
        });
        it('should be disabled when toggle disable',async()=>{
            await browser.get('/combo-select/disable');
            const selectEl = $('jigsaw-combo-select'),
                button = $$('jigsaw-button');
            browser.actions().mouseMove(selectEl).perform();
            await waitForPresence('jigsaw-tile');
            expectToExist('jigsaw-tile');
            button.click();
            browser.actions().mouseMove(selectEl).perform();
            await waitForNotPresence('jigsaw-tile');
            expectToExist('jigsaw-tile',false);
        });

    })
});
