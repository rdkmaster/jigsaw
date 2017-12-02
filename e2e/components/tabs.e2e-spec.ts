import {browser, element, by, ExpectedConditions} from "protractor";
import {waitForPresence} from "../utils/index";

describe('tabs', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test tab', () => {
        beforeEach(() => {
            browser.get('/tab/basic');
        });
        it('should present different content when click tab label ', async () => {
            const tabsLabelEl = element.all(by.tagName('jigsaw-tab-label')),
                tabContentEl = element.all(by.tagName('jigsaw-tab-content'));
            await  browser.wait(ExpectedConditions.textToBePresentInElement(tabContentEl.get(2), 'tab content 3'));
            await expect(tabContentEl.get(2).getText()).toBe('tab content 3');
            tabsLabelEl.get(1).click();
            await  browser.wait(ExpectedConditions.textToBePresentInElement(tabContentEl.get(1).element(by.tagName('H3')), 'user register center'), 1000);
            await expect(tabContentEl.get(1).element(by.tagName('H3')).getText()).toBe('user register center');//this expect do not need wait maybe;
            tabsLabelEl.get(0).click();
            await  browser.wait(ExpectedConditions.textToBePresentInElement(tabContentEl.get(0), 'tab content 1'));
            await expect(tabContentEl.get(0).getText()).toBe('tab content 1');
            await expect(tabsLabelEl.get(3).getCssValue('pointer-events')).toBe('none');
        })
    });
    describe('test tabApi', async () => {
        beforeEach(() => {
            browser.get('/tab/api');
            browser.sleep(300);
        });
        it('should operate tab when click jigsaw button', async () => {
            const jigsawButton = element.all(by.tagName('jigsaw-button')),
                tabsLabelEl = element.all(by.tagName('jigsaw-tab-label')),
                tabContentEl = element.all(by.tagName('jigsaw-tab-content'));
            await browser.sleep(300);
            jigsawButton.get(0).click();
            await  browser.wait(ExpectedConditions.visibilityOf(tabsLabelEl.get(4)));
            await expect(tabContentEl.get(4).element(by.tagName('H3')).getText()).toBe('Hi Jerry, please input your information');
            jigsawButton.get(3).click();
            await  browser.wait(ExpectedConditions.invisibilityOf(tabContentEl.get(0)));
            await  expect(tabContentEl.get(0).getCssValue('opacity')).toBe('0');
            jigsawButton.get(4).click();
            await  browser.wait(ExpectedConditions.visibilityOf(tabContentEl.get(0)));
            await expect(tabContentEl.get(0).getCssValue('opacity')).toBe('1');
            jigsawButton.get(5).click();
            await  browser.wait(ExpectedConditions.invisibilityOf(tabContentEl.get(0)));
            await expect(tabsLabelEl.get(0).getText()).toBe('Tab 2');
        })
    });
    describe('test tabApi', async () => {
        beforeEach(() => {
            browser.get('/tab/with-input');
        });
        it('should display table when click "GetTableData"', async () => {
            const getTableDate = element(by.css('.container')).element(by.tagName('jigsaw-button')),
                  tableEl = element(by.css('.jigsaw-tabs-content')).element(by.tagName('jigsaw-table')).element(by.tagName('table')),
                  headerSpanEl = tableEl.all(by.tagName('SPAN'));
            getTableDate.click();
            await browser.wait(ExpectedConditions.textToBePresentInElement(headerSpanEl.get(0), '姓名'));
            await expect(tableEl.getText()).not.toBe('');
        })
    });
});
