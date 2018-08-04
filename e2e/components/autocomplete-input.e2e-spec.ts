import {$$, browser, by, element} from 'protractor';
import {waitForPresence} from "../utils/await";

describe('autocomplete-input', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test basic function', () => {
        it('should display options', async () => {
            await browser.get('/autocomplete-input/non-group');
            const selectEl = element(by.tagName('jigsaw-autocomplete-input')),
                buttons = $$('jigsaw-autocomplete-input-item');
            await browser.actions().click(selectEl).perform();
            expect(await selectEl.getText()).toBe('');
            await waitForPresence('jigsaw-autocomplete-input-list-box');
            await buttons.get(0).click();
            expect(await selectEl.getText()).toBe('隐藏/显示元素');
            await buttons.get(1).click();
            expect(await selectEl.getText()).toBe('滚动页面');
        });
    })
});
