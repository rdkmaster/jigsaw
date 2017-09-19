import {browser, element, by, ExpectedConditions} from "protractor";

describe('tabs', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test tabs', () => {
        beforeEach(() => {
            browser.get('/#/tabs/basic');
        });
        it('should present different content when click tabs label ', async () => {
            const tabsLabelEl = element.all(by.tagName('jigsaw-tab-label')),
                tabContentEl = element.all(by.tagName('jigsaw-tab-content'));
            expect(tabContentEl.get(2).getText()).toBe('tab content 3');
            tabsLabelEl.get(1).click();
            await  browser.wait(ExpectedConditions.textToBePresentInElement(tabContentEl.get(1).element(by.tagName('H3')), 'user register center'));
            expect(tabContentEl.get(1).element(by.tagName('H3')).getText()).toBe('user register center');//this expect do not need wait maybe;
            tabsLabelEl.get(0).click();
            await  browser.wait(ExpectedConditions.textToBePresentInElement(tabContentEl.get(0), 'tab content 1'));
            expect(tabContentEl.get(0).getText()).toBe('tab content 1');
            expect(tabsLabelEl.get(3).getCssValue('pointer-events')).toBe('none');
        })
    });
});
