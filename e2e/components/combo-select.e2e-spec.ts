import {$, $$, browser, by, element} from 'protractor';
import {waitForNotPresence, waitForPresence} from "../utils/await";
import {expectToExist} from "../utils/asserts";
import {mouseMove} from "../utils/actions";

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
            await browser.get('/combo-select/trigger');
            const selectEl = $('jigsaw-combo-select');
            const openByClick = element(by.id('openByClick'));
            const openByHover = element(by.id('openByHover'));
            const closeByClick = element(by.id('closeByClick'));
            const closeByLeave = element(by.id('closeByLeave'));

            /**
             * open: hover, close: leave
             */
            // check open debounce
            browser.actions().mouseMove(selectEl).perform();
            browser.sleep(50);
            browser.actions().mouseMove(openByClick).perform();
            expectToExist('.drop-down', false);
            browser.actions().mouseMove(selectEl).perform();
            browser.sleep(500);
            expectToExist('.drop-down', true);
            // check close debounce
            browser.actions().mouseMove(openByClick).perform();
            browser.sleep(200);
            browser.actions().mouseMove(selectEl).perform();
            browser.sleep(500);
            expectToExist('.drop-down', true);
            browser.actions().mouseMove(openByClick).perform();
            browser.sleep(800);
            expectToExist('.drop-down', false);

            /**
             * open: click, close: leave
             */
            openByClick.click();
            browser.sleep(50);
            browser.actions().mouseMove(selectEl).perform();
            browser.sleep(200);
            expectToExist('.drop-down', false);
            selectEl.click();
            browser.actions().mouseMove(selectEl).perform();
            await waitForPresence('.drop-down');
            expectToExist('.drop-down', true);
            // check close debounce
            browser.actions().mouseMove(openByClick).perform();
            browser.sleep(200);
            browser.actions().mouseMove(selectEl).perform();
            browser.sleep(500);
            expectToExist('.drop-down', true);
            browser.actions().mouseMove(openByClick).perform();
            browser.sleep(800);
            expectToExist('.drop-down', false);

            /**
             * open: click, close: click
             */
            closeByClick.click();
            browser.sleep(50);
            browser.actions().mouseMove(selectEl).perform();
            browser.sleep(200);
            expectToExist('.drop-down', false);
            selectEl.click();
            await waitForPresence('.drop-down');
            expectToExist('.drop-down', true);
            // check close status
            browser.actions().mouseMove(openByClick).perform();
            browser.sleep(800);
            expectToExist('.drop-down', true);
            closeByClick.click();
            await waitForNotPresence('.drop-down');
            expectToExist('.drop-down', false);

            /**
             * open: hover, close: click
             */
            openByHover.click();
            browser.sleep(50);
            // check open debounce
            browser.actions().mouseMove(selectEl).perform();
            browser.sleep(10);
            browser.actions().mouseMove(openByClick).perform();
            expectToExist('.drop-down', false);
            browser.actions().mouseMove(selectEl).perform();
            browser.sleep(500);
            expectToExist('.drop-down', true);
            // check close status
            browser.actions().mouseMove(openByClick).perform();
            browser.sleep(800);
            expectToExist('.drop-down', true);
            openByHover.click();
            await waitForNotPresence('.drop-down');
            expectToExist('.drop-down', false);
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
