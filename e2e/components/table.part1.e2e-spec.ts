import {browser, element, by} from "protractor";

describe('table', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test setHeaderClass', () => {
        beforeEach(() => {
            browser.get('/#/table/setHeaderClass');
        });
        it('should set header class', () => {
            expect(element.all(by.css('.jigsaw-table-header-cell')).get(1).getCssValue('COLOR')).toBe('rgb(41, 78, 121)');
            expect(element.all(by.css('.jigsaw-table-header-cell')).get(0).getCssValue('COLOR')).toBe('rgb(255, 170, 0)');
        })
    });
    describe('test setCellClass', () => {
        beforeEach(() => {
            browser.get('/#/table/setCellClass');
        });
        it('should set cell class', () => {
            expect(element.all(by.css('.red-text')).get(0).getCssValue('COLOR')).toBe('rgb(255, 170, 0)');
            expect(element.all(by.css('.red-text')).get(10).getCssValue('COLOR')).toBe('rgb(255, 170, 0)');
        })
    });
    describe('test setHeaderRender', () => {
        beforeEach(() => {
            browser.get('/#/table/setHeaderRender');
        });
        it('should set header render', () => {
            expect(element(by.css('.fa-map-signs')).isPresent()).toBe(true);
        })
    });
    describe('test setHeaderSort', () => {
        beforeEach(() => {
            browser.get('/#/table/setHeaderSort');
        });
        it('should set header sort', () => {
            const tableSortUp = element(by.css('.jigsaw-table-sort-up')),
                tableSortDown = element(by.css('.jigsaw-table-sort-down')),
                columnFirstEl = element(by.css('.jigsaw-table-body')).all(by.tagName('TR')).first().all(by.tagName('TD')).get(0),
                columnlastEl = element(by.css('.jigsaw-table-body')).all(by.tagName('TR')).last().all(by.tagName('TD')).get(0);
            expect(columnFirstEl.getText()).toBe('Tony');
            expect(columnlastEl.getText()).toBe('Scott');
            tableSortUp.click();
            expect(columnFirstEl.getText()).toBe('Aaron');
            expect(columnlastEl.getText()).toBe('Zora');
            tableSortDown.click();
            expect(columnFirstEl.getText()).toBe('Zora');
            expect(columnlastEl.getText()).toBe('Aaron');
        })
    });
});
