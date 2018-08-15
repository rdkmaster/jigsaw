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
            await browser.actions().mouseMove(selectEl).perform();
            expect(await selectEl.getText()).toBe('北京');
            await waitForPresence('jigsaw-tile');
            await buttons.get(1).click();
            expect(await selectEl.getText()).toBe('北京 上海');
            await buttons.get(0).click();
            expect(await selectEl.getText()).toBe('上海');
            expect(await selectEl.getCssValue('width')).toBe(await element(by.tagName('jigsaw-tile')).getCssValue('width'));
        });
        xit('should change trigger when click button', async () => {
            await browser.get('/combo-select/trigger');
            const selectEl = $('jigsaw-combo-select');
            const openByClick = element(by.id('openByClick'));
            const openByHover = element(by.id('openByHover'));
            const closeByClick = element(by.id('closeByClick'));
            const closeByLeave = element(by.id('closeByLeave'));

            /**
             * open: hover, close: leave
             */
            await openByHover.click();
            await closeByLeave.click();
            await browser.sleep(150);
            await browser.actions().mouseMove(selectEl).perform();
            await waitForPresence('.drop-down');
            await expectToExist('.drop-down', true);
            await browser.actions().mouseMove(openByClick).perform();
            await waitForNotPresence('.drop-down');
            await expectToExist('.drop-down', false);

            /**
             * open: click, close: leave
             */
            await openByClick.click();
            await closeByLeave.click();
            await browser.sleep(150);
            await browser.actions().mouseMove(selectEl).perform();
            await browser.sleep(200);
            await expectToExist('.drop-down', false);
            await selectEl.click();
            await browser.actions().mouseMove(selectEl).perform();
            await waitForPresence('.drop-down');
            await expectToExist('.drop-down', true);
            await browser.actions().mouseMove(openByClick).perform();
            await waitForNotPresence('.drop-down');
            await expectToExist('.drop-down', false);

            /**
             * open: click, close: click
             */
            await openByClick.click();
            await closeByClick.click();
            await browser.sleep(150);
            await browser.actions().mouseMove(selectEl).perform();
            await browser.sleep(200);
            await expectToExist('.drop-down', false);
            await selectEl.click();
            await waitForPresence('.drop-down');
            await expectToExist('.drop-down', true);
            await browser.actions().mouseMove(openByClick).perform();
            await browser.sleep(450);
            // should not disappear after debounce timeout
            //await expectToExist('.drop-down', true);
            closeByClick.click();
            await waitForNotPresence('.drop-down');
            await expectToExist('.drop-down', false);

            /**
             * open: hover, close: click
             */
            await openByHover.click();
            await closeByClick.click();
            await browser.sleep(150);
            // check open debounce
            await browser.actions().mouseMove(selectEl).perform();
            await waitForPresence('.drop-down');
            await expectToExist('.drop-down', true);
            await browser.actions().mouseMove(openByClick).perform();
            await browser.sleep(450);
            // should not disappear after debounce timeout
            await expectToExist('.drop-down', true);
            await openByHover.click();
            await waitForNotPresence('.drop-down');
            await expectToExist('.drop-down', false);
        });
        it('should be disabled when toggle disable', async () => {
            await browser.get('/combo-select/disable');
            const selectEl = $('jigsaw-combo-select'),
                button = $$('jigsaw-button');
            await waitForPresence('jigsaw-tile');
            //await expectToExist('jigsaw-tile');
            await button.click();
            await browser.actions().mouseMove(selectEl).perform();
            await waitForNotPresence('jigsaw-tile');
            await expectToExist('jigsaw-tile', false);
        });
        it('should display collapse when mouse enter combo-select', async () => {
            await browser.get('/combo-select/drop-down-status');
            const selectEl = $('jigsaw-combo-select'),
                collapse = $('jigsaw-collapse'),
                nameInput = collapse.$$("jigsaw-collapse-pane").get(0).$("input"),
                passwordInput = collapse.$$("jigsaw-collapse-pane").get(1).$("input");
            await mouseMove(selectEl);
            await waitForPresence('jigsaw-collapse');
            await expectToExist('jigsaw-collapse');
            expect(await nameInput.getAttribute("ng-reflect-model")).toBe("Jigsaw");
            await nameInput.sendKeys("123");
            expect(await nameInput.getAttribute("ng-reflect-model")).toBe("Jigsaw123");
            await collapse.$$("jigsaw-collapse-pane").get(1).click();
            await passwordInput.sendKeys("456");
            expect(await passwordInput.getAttribute("value")).toBe("456");
            await mouseMove({x: 500, y: 500});
            await waitForNotPresence('jigsaw-collapse');
            await mouseMove(selectEl);
            await waitForPresence('jigsaw-collapse');
            expect(await nameInput.getAttribute("ng-reflect-model")).toBe("Jigsaw123");
            await collapse.$$("jigsaw-collapse-pane").get(1).click();
            expect(await passwordInput.getAttribute("value")).toBe("");
        });
        it('should change drop down option when click selected item', async () => {
            await browser.get('/combo-select/events');
            const selectEl = $('jigsaw-combo-select'),
                dropDownButton1 = $('.drop-down-container').$$("jigsaw-button").get(0);
            await mouseMove(selectEl);
            await waitForPresence('.drop-down-container');
            await dropDownButton1.click();
            await browser.sleep(1000);
            expect(await dropDownButton1.getCssValue('background-color')).toBe('rgba(212, 98, 98, 1)');
            // await selectEl.$("jigsaw-tag").click();
            // await browser.sleep(1000);
            // expect(await dropDownButton1.getCssValue('background-color')).toBe('rgba(65, 173, 220, 1)');
        });
        it('should toggle multiple & auto close on select', async () => {
            await browser.get('/combo-select/multiple');
            const selectEl = $('jigsaw-combo-select'),
                button = $('jigsaw-button'),
                tileOptions = $$('jigsaw-tile-option');
            await button.click();
            await browser.sleep(300);
            await mouseMove(selectEl);
            await waitForPresence('jigsaw-tile');
            await tileOptions.get(2).click();
            expect(await element(by.tagName('jigsaw-tag')).element(by.tagName('span')).getText()).toBe('南京');
            await waitForNotPresence('jigsaw-tile');
            await expectToExist('jigsaw-tile', false);
        });
        it('should open combo select through two ways', async () => {
            await browser.get('/combo-select/open');
            const button = $('jigsaw-button');
            //await expectToExist('jigsaw-tile');
            await  button.click();
            await waitForNotPresence('jigsaw-tile');
            await expectToExist('jigsaw-tile', false);
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
            await expect(combo1Size.width).toBe(200);
            await  mouseMove(comboSelect.get(1));
            await waitForPresence('#input3');
            const innerInput = element(by.id('input3'));
            input3Size = await innerInput.getSize();
            expect(await input3Size.width).toBe(400);
            await buttons.get(0).clear();
            await buttons.get(1).clear();
            await buttons.get(0).sendKeys(100);
            await buttons.get(1).sendKeys(100);
            combo1Size = await comboSelect.get(0).getSize();
            expect(await combo1Size.width).toBe(100);
            await  mouseMove(comboSelect.get(1));
            await waitForPresence('#input3');
            input3Size = await innerInput.getSize();
            expect(await input3Size.width).toBe(240);
        });
    })
});
