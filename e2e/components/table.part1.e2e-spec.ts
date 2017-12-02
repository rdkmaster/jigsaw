import {browser, element, by} from "protractor";
import {waitForPresence} from "../utils/index";

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
            browser.switchTo().defaultContent();
            await waitForPresence('.red-text');
            expect(element.all(by.css('.red-text')).get(0).getCssValue('COLOR')).toBe('rgb(255, 170, 0)');
            expect(element.all(by.css('.red-text')).get(10).getCssValue('COLOR')).toBe('rgb(255, 170, 0)');
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
            browser.switchTo().defaultContent();
            await waitForPresence('.jigsaw-table-cell-content');
            const canBeGroupEl=element(by.css('.jigsaw-table-body')).all(by.tagName('TR')).get(3).all(by.tagName('TD')).get(2);
            expect(canBeGroupEl.getAttribute('rowspan')).toBe('2');
        })
    });
});
