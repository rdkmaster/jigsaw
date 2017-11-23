import {browser, element, by, ExpectedConditions} from "protractor";

describe('tile', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test selectedItems', () => {
        beforeEach(() => {
            browser.get('/tag/basic');
        });
        it('delete tag and check the color of tag', async () => {
            const jigsawTag = element.all(by.tagName('jigsaw-tag'));
            expect(jigsawTag.get(0).getAttribute('ng-reflect-closable')).toBe('false');
            expect(element(by.id('jigsaw-tag2')).all(by.tagName('SPAN')).get(0).getText()).toBe('222222');
            jigsawTag.get(1).element(by.css('.jigsaw-tag-close-bar')).click();//数量不减；
            await browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.id('jigsaw-tag2')))));//it works!
            expect(jigsawTag.get(1).all(by.tagName('SPAN')).get(0).getText()).toBe('wdffrrghhttt3dd2222222fffffff55ffferrrrr');
            expect(jigsawTag.get(2).getCssValue('background-color')).toBe('rgba(0, 143, 212, 1)')
        })
    });
});
