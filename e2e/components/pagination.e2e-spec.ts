import {browser, element, by, protractor} from "protractor";
// import {beforeEach} from "selenium-webdriver/testing";

describe('pagination', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test basic', () => {
        beforeEach(() => {
            browser.get('/#/pagination/basic');
        });
        it('should flip page when click jigsaw page item', () => {
            const jigsawPagingEl = element(by.css('.jigsaw-paging')),
                pageItemEl = jigsawPagingEl.all(by.tagName('jigsaw-paging-item')),
                pEl = element.all(by.tagName('P')).get(1);
            expect(jigsawPagingEl.element(by.css('.jigsaw-paging-disabled')).isPresent()).toBe(true);

            pageItemEl.get(2).element(by.tagName('SPAN')).click();
            expect(jigsawPagingEl.element(by.css('.jigsaw-page-current')).getText()).toBe('3');
            expect(pEl.getText()).toBe('当前第3页');
            expect(jigsawPagingEl.element(by.css('.jigsaw-paging-disabled')).isPresent()).toBe(false);

        });
        it('should become visible when click page item nearby hidden item', () => {
            const jigsawPagingEl = element(by.css('.jigsaw-paging')),
                pageItemEl = jigsawPagingEl.all(by.tagName('jigsaw-paging-item'));
            expect(pageItemEl.get(5).getText()).toBe('');
            pageItemEl.get(4).element(by.tagName('SPAN')).click();
            expect(jigsawPagingEl.element(by.css('.jigsaw-page-current')).getText()).toBe('5');
        });
        it('should go to specified page when click button or send keys to "Goto" input', () => {
            const jigsawPagingEl = element(by.css('.jigsaw-paging')),
                pageItemEl = jigsawPagingEl.all(by.tagName('jigsaw-paging-item')),
                buttonEl = element(by.tagName('BUTTON')),
                gotoEl = element(by.css('.jigsaw-paging-goto .ng-valid'));
            buttonEl.click();
            expect(jigsawPagingEl.element(by.css('.jigsaw-page-current')).getText()).toBe('6');
            gotoEl.click();
            gotoEl.sendKeys(3);
            gotoEl.sendKeys(protractor.Key.ENTER);
            expect(jigsawPagingEl.element(by.css('.jigsaw-page-current')).getText()).toBe('3');
        });
        it('should change the number of pieces per page', () => {
            const jigsawPagingEl = element(by.css('.jigsaw-paging')),
                pageItemEl = jigsawPagingEl.all(by.tagName('jigsaw-paging-item')),
                paginationSelectEl = element(by.css('.jigsaw-select-box')),
                selectOptionEl = paginationSelectEl.all(by.tagName('jigsaw-select-option'));
            paginationSelectEl.click();
            // expect(selectOptionEl.get(0).getText()).toBe('5/Page');
            expect(pageItemEl.count()).toBe(55);
            selectOptionEl.get(0).click();
            expect(pageItemEl.count()).toBe(110);
        });
        xit('"..." change to ">>" when move the mouse to jigsaw page nexts', () => {
            const nextsiconEl = element(by.css('.jigsaw-page-nexts'));
            expect(nextsiconEl.getText()).toBe('. . .');
            browser.actions().mouseMove(element(by.css('.jigsaw-page-nexts')));
            expect(nextsiconEl.getText()).toBe('>>');
        });
    })
});
