import {browser, element, by, $, $$} from 'protractor';
import {waitForNotPresence, waitForPresence, waitForTextPresence} from "../utils/await";
import {expectToExist} from "../utils/asserts";
import {mouseMove} from "../utils/actions";
import {getWindowSize} from "../utils/popup";

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
            await browser.get('/combo-select/events');
            const selectEl = $('jigsaw-combo-select'),
                buttons = $$('jigsaw-button');
            browser.actions().mouseMove(selectEl).perform();
            await waitForPresence('.drop-down-container');
            expect(buttons.count()).toBe(10);
            expectToExist('.drop-down-container');
            browser.actions().mouseMove({x: 1000, y: 135}).perform();
            await waitForNotPresence('.drop-down-container');
            expectToExist('.drop-down-container', false);
            buttons.get(0).click();
            selectEl.click();
            await waitForPresence('.drop-down-container');
            expectToExist('.drop-down-container');
        });
        it('should be disabled when toggle disable', async () => {
            await browser.get('/combo-select/disable');
            const selectEl = $('jigsaw-combo-select'),
                button = $$('jigsaw-button');
            browser.actions().mouseMove(selectEl).perform();
            await waitForPresence('jigsaw-tile');
            expectToExist('jigsaw-tile');
            button.click();
            browser.actions().mouseMove(selectEl).perform();
            await waitForNotPresence('jigsaw-tile');
            expectToExist('jigsaw-tile', false);
        });
        it('should display collapse when mouse enter combo-select', async () => {
            await browser.get('/combo-select/drop-down-status');
            const selectEl = $('jigsaw-combo-select'),
                collapse = $('jigsaw-collapse');
            mouseMove(selectEl);
            await waitForPresence('jigsaw-collapse');
            expectToExist('jigsaw-collapse');
        });
        it('should toggle multiple & auto close on select', async () => {
            await browser.get('/combo-select/multiple');
            const selectEl = $('jigsaw-combo-select'),
                button = $('jigsaw-button'),
                tileOptions = $$('jigsaw-tile-option');
            button.click();
            browser.sleep(300);
            mouseMove(selectEl);
            await waitForPresence('jigsaw-tile');
            tileOptions.get(2).click();
            expect(element(by.tagName('jigsaw-tag')).element(by.tagName('span')).getText()).toBe('南京');
            await waitForNotPresence('jigsaw-tile');
            expectToExist('jigsaw-tile', false);
        });
        it('should open combo select through two ways', async () => {
            await browser.get('/combo-select/open');
            const button = $('jigsaw-button');
            expectToExist('jigsaw-tile');
            button.click();
            await waitForNotPresence('jigsaw-tile');
            expectToExist('jigsaw-tile', false);
        });
        xit('should be searchable', async () => {
            browser.get('/combo-select/searchable');
            const input = $$('jigsaw-input').get(0),
                tile = $('jigsaw-tile');
            mouseMove(input);
            browser.sleep(1000);
            input.sendKeys('ando');
            expect(tile.getText()).toBe('andorrda');
        });
        it('shoud set combo select width', async () => {
            await browser.get('/combo-select/set-width');
            const comboSelect = $$('jigsaw-combo-select'),
                buttons = $$('input');
            let combo1Size, input3Size;
            combo1Size = await comboSelect.get(0).getSize();
            expect(combo1Size.width).toBe(200);
            mouseMove(comboSelect.get(1));
            await waitForPresence('#input3');
            const innerInput = element(by.id('input3'));
            input3Size = await innerInput.getSize();
            expect(input3Size.width).toBe(400);
            buttons.get(0).clear();
            buttons.get(1).clear();
            buttons.get(0).sendKeys(100);
            buttons.get(1).sendKeys(100);
            combo1Size = await comboSelect.get(0).getSize();
            expect(combo1Size.width).toBe(100);
            mouseMove(comboSelect.get(1));
            await waitForPresence('#input3');
            input3Size = await innerInput.getSize();
            expect(input3Size.width).toBe(240);
        });
    })
});
