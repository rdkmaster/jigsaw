import {browser, element, by} from "protractor";

describe('tile', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test selected-items', () => {
        beforeEach(() => {
            browser.get('/tile/selected-items');
        });
        it('should be active when clicked', () => {
            const jigsawTitleEl = element(by.tagName('jigsaw-tile')),
                tileOptionsEl = jigsawTitleEl.all(by.tagName('jigsaw-tile-option'));
            expect(jigsawTitleEl.element(by.css('.jigsaw-tile-option-active')).getText()).toBe('深圳');
            tileOptionsEl.get(1).click();
            expect(jigsawTitleEl.element(by.css('.jigsaw-tile-option-active')).getText()).toBe('上海');
        })
    });
    describe('test multiple-select', () => {
        beforeEach(() => {
            browser.get('/tile/multiple-select');
        });
        it('should be active when clicked', () => {
            const jigsawTitleEl = element(by.tagName('jigsaw-tile')),
                tileOptionsEl = jigsawTitleEl.all(by.tagName('jigsaw-tile-option'));
            expect(jigsawTitleEl.element(by.css('.jigsaw-tile-option-active')).getText()).toBe('深圳');
            tileOptionsEl.get(0).click();
            expect(jigsawTitleEl.all(by.css('.jigsaw-tile-option-active')).count()).toBe(2);
            tileOptionsEl.get(3).click();
            expect(jigsawTitleEl.all(by.css('.jigsaw-tile-option-active')).count()).toBe(1);
            tileOptionsEl.get(2).click();
            expect(jigsawTitleEl.all(by.css('.jigsaw-tile-option-active')).count()).toBe(2);
            tileOptionsEl.get(3).click();
            expect(jigsawTitleEl.all(by.css('.jigsaw-tile-option-active')).count()).toBe(3);
        })
    });
});
