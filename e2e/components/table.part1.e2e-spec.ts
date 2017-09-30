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
            expect(element.all(by.css('.red-text')).getCssValue('COLOR')).toBe('rgb(255, 170, 0)');
        })
    });
});
