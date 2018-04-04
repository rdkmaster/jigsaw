import {browser, element, by, ExpectedConditions, $, $$} from "protractor";
import {waitForPresence} from "../utils/index";
import {waitForTextPresence} from "../utils/await";

describe('table', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test setHeaderClass', () => {
        beforeEach(() => {
            browser.get('/table/header-class');
        });
        it('should set header class', async () => {
            browser.switchTo().defaultContent();
            await waitForPresence('.red-text');
            expect(element.all(by.css('.jigsaw-table-header-cell')).get(1).getCssValue('COLOR')).toBe('rgb(41, 78, 121)');
            expect(element.all(by.css('.jigsaw-table-header-cell')).get(0).getCssValue('COLOR')).toBe('rgb(255, 170, 0)');
        })
    });
    describe('test set-cell-class', () => {
        beforeEach(() => {
            browser.get('/table/set-cell-class');
        });
        it('should set cell class', async () => {
            const redEl = element.all(by.css('.red-text'));
            await browser.wait(ExpectedConditions.visibilityOf(redEl.get(10)));
            await expect(redEl.get(0).getCssValue('COLOR')).toBe('rgb(255, 170, 0)');
            await expect(redEl.get(10).getCssValue('COLOR')).toBe('rgb(255, 170, 0)');
        })
    });
    describe('test setHeaderRender', () => {
        beforeEach(() => {
            browser.get('/table/header-render');
        });
        it('should set header render', async () => {
            browser.switchTo().defaultContent();
            await waitForPresence('.fa-map-signs');
            expect(element(by.css('.fa-map-signs')).isPresent()).toBe(true);
        })
    });
    describe('test setHeaderSort', () => {
        beforeEach(() => {
            browser.get('/table/sortable');
        });
        it('should set header sort', async () => {
            browser.switchTo().defaultContent();
            await waitForPresence('.jigsaw-table-sort-up');
            const tableSortUp = element(by.css('.jigsaw-table-sort-up')),
                tableSortDown = element(by.css('.jigsaw-table-sort-down')),
                columnFirstEl = element(by.css('.jigsaw-table-body')).all(by.tagName('TR')).first().all(by.tagName('TD')).get(0),
                columnlastEl = element(by.css('.jigsaw-table-body')).all(by.tagName('TR')).last().all(by.tagName('TD')).get(0);
            expect(columnFirstEl.getText()).toBe('Michelle');
            expect(columnlastEl.getText()).toBe('Dave');
            tableSortUp.click();
            expect(columnFirstEl.getText()).toBe('Abner');
            expect(columnlastEl.getText()).toBe('Wanda');
            tableSortDown.click();
            expect(columnFirstEl.getText()).toBe('Wanda');
            expect(columnlastEl.getText()).toBe('Abner');
        })
    });
    describe('test cell-render', () => {
        beforeEach(() => {
            browser.get('/table/cell-render');
        });
        it('should set cell render', async () => {
            browser.switchTo().defaultContent();
            await waitForPresence('.fa-universal-access');
            expect(element(by.css('.fa-universal-access')).isPresent()).toBe(true);
        })
    });
    describe('test column-group', () => {
        beforeEach(() => {
            browser.get('/table/column-group');
        });
        it('should set column group', async () => {
            const canBeGroupEl = element(by.css('.jigsaw-table-body')).all(by.tagName('TR')).get(3).all(by.tagName('TD')).get(2);
            await waitForPresence('.jigsaw-table-cell-content');
            expect(canBeGroupEl.getAttribute('rowspan')).toBe('2');
        })
    });
    describe('test column-group', () => {
        it('should save selected information', async () => {
            await browser.get('/table/checkbox-column-pageable');
            const pagingItems = $$('jigsaw-paging-item'),
                selectedInfo =$('.demo-1').$$('p'),
                tags = $$('j-tag');
            let tr = element(by.css('.jigsaw-table-body')).all(by.tagName('TR'));
            await browser.wait(ExpectedConditions.textToBePresentInElement(tr.get(0).$$('td').get(1), 'Michelle'));
            await tr.get(1).$('jigsaw-checkbox').click();
            await tr.get(3).$('jigsaw-checkbox').click();
            expect(await selectedInfo.get(0).getText()).toBe('当页前选中的行索引：1,3')
            await pagingItems.get(2).click();
            await browser.wait(ExpectedConditions.textToBePresentInElement(tr.get(0).$$('td').get(1), 'Rachel'));
            await element(by.css('.jigsaw-table-body')).all(by.tagName('TR')).get(4).$('jigsaw-checkbox').click();
            expect(await selectedInfo.get(0).getText()).toBe('当页前选中的行索引：4')
            expect(await tags.get(0).$("span").getText()).toBe('Mignon');
            expect(await tags.get(2).$("span").getText()).toBe('Isidore');
        })
    });
});
