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
    describe('test tabApi', () => {
        beforeEach(() => {
            browser.get('/#/tabs/tabApi');
        });
        it('should operate tabs when click jigsaw button', async () => {
            const jigsawButton = element(by.css('.container')).all(by.css('.jigsaw-button')),
                tabsLabelEl = element.all(by.tagName('jigsaw-tab-label')),
                tabContentEl = element.all(by.tagName('jigsaw-tab-content'));
            expect(tabContentEl.get(0).getText()).toBe('This is the body of the first tab');
            jigsawButton.get(0).click();
            await  browser.wait(ExpectedConditions.presenceOf(tabsLabelEl.get(4)));
            expect(tabContentEl.get(4).element(by.tagName('H3')).getText()).toBe('Hi Jerry, please input your information');
            jigsawButton.get(3).click();
           // await  browser.wait(ExpectedConditions.not(ExpectedConditions.textToBePresentInElement(tabContentEl.get(0), 'tab content 1')));
            expect( tabContentEl.get(0).getCssValue('opacity')).toBe('0');
            jigsawButton.get(4).click();
            expect( tabContentEl.get(0).getCssValue('opacity')).toBe('1');
            jigsawButton.get(5).click();
            //await  browser.wait(ExpectedConditions.not(ExpectedConditions.textToBePresentInElement(tabContentEl.get(0), 'tab content 1')));
            expect(tabsLabelEl.get(0).getText()).toBe('Tab 2');
        })
    });
    describe('test tabApi', () => {
        beforeEach(() => {
            browser.get('/#/tabs/withInput');
        });
        it('should display table when click "GetTableData"',async()=>{
            const getTableDate=element(by.css('.container')).element(by.tagName('jigsaw-button')),
                tableEl=element(by.tagName('TABLE'));
            expect(tableEl.getText()).toBe('');
            getTableDate.click();
           // await browser.wait(ExpectedConditions.presenceOf(element(by.tagName('TD'))));
            expect(tableEl.getText()).not.toBe('');
        })
    });
});
