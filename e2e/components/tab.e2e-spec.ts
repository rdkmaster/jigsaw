import {browser, element, by, ExpectedConditions} from "protractor";
import {waitForPresence} from "../utils/index";

describe('tabs', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test tab', async () => {
        it('should present different content when click tab label ', async () => {
            const tabsLabelEl = element.all(by.tagName('jigsaw-tab-label')),
                tabContentEl = element.all(by.tagName('jigsaw-tab-content'));
            await browser.get('/tab/basic');
            await tabsLabelEl.get(1).click();
            await browser.wait(ExpectedConditions.textToBePresentInElement(tabContentEl.get(1).element(by.tagName('H3')), 'user register center'));
            await expect(tabContentEl.get(1).element(by.tagName('H3')).getText()).toBe('user register center');//this expect do not need wait maybe;
            await tabsLabelEl.get(0).click();
            await browser.wait(ExpectedConditions.textToBePresentInElement(tabContentEl.get(0), 'tab content 1'));
            await expect(tabContentEl.get(0).getText()).toBe('tab content 1');
            await expect(tabsLabelEl.get(3).getCssValue('pointer-events')).toBe('none');
        })
    });
    describe('test tabApi', () => {
        it('should operate tab when click jigsaw button', async () => {
            const jigsawButton = element(by.css('.container')).all(by.css('.jigsaw-button')),
                tabsLabelEl = element.all(by.tagName('jigsaw-tab-label')),
                tabContentEl = element.all(by.tagName('jigsaw-tab-content'));
            await browser.get('/tab/api');
            jigsawButton.get(0).click();
            await browser.wait(ExpectedConditions.presenceOf(tabsLabelEl.get(4)));
            await expect(tabContentEl.get(4).element(by.tagName('H3')).getText()).toBe('Hi Jerry, please input your information');
            jigsawButton.get(3).click();
            await browser.wait(ExpectedConditions.not(ExpectedConditions.textToBePresentInElement(tabContentEl.get(0), 'tab content 1')));
            await expect(tabContentEl.get(0).getCssValue('opacity')).toBe('0');
            jigsawButton.get(4).click();
            await expect(tabContentEl.get(0).getCssValue('opacity')).toBe('1');
            jigsawButton.get(5).click();
            await browser.wait(ExpectedConditions.not(ExpectedConditions.textToBePresentInElement(tabContentEl.get(0), 'tab content 2')));
            await expect(tabsLabelEl.get(0).getText()).toBe('Tab 2');
        })
    });
    describe('test tab with input', async () => {
        it('should display table when click "GetTableData"', async () => {
            const getTableDate = element(by.css('.container')).element(by.tagName('jigsaw-button')),
                tableEl = element(by.css('.jigsaw-tabs-content')).element(by.tagName('jigsaw-table')).element(by.tagName('table'));
            await browser.get('/tab/with-input');
            await getTableDate.click();
            await browser.wait(ExpectedConditions.visibilityOf(element(by.css('.jigsaw-tabs-content')).element(by.tagName('jigsaw-table'))));
            await browser.sleep(3000);
            await expect(tableEl.getText()).not.toBe('');
        })
    });
});
