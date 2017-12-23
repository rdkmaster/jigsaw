import {browser, element, by, $$, ExpectedConditions} from 'protractor';
import {expectToExist} from "../utils/asserts";
import {expectPopupBlock} from "../utils/popup";
import {waitForNotPresence, waitForPresence} from "../utils/await";

describe('loading', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test ball loading', () => {
        beforeEach(() => {
            browser.get('/loading/ball');
        });
        it('should display correctly', async () => {
            const buttons = element.all(by.css('.jigsaw-button')),
                loadingBlock = element(by.tagName('jigsaw-block')),
                ballsEl = element(by.css('.jigsaw-loading-content')).all(by.tagName('div'));
            buttons.get(0).click();
            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.jigsaw-block-host'))));
            expect(loadingBlock.getCssValue('position')).toBe('absolute');
            expect(loadingBlock.getCssValue('z-index')).toBe('1030');
            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.jigsaw-loading-content'))));
            expect(element(by.css('.jigsaw-loading-content')).getCssValue('width')).toBe('70px');
            expect(element(by.css('.jigsaw-loading-content')).getCssValue('margin-left')).toBe('-35px');
            buttons.get(1).click();
            await waitForNotPresence('.jigsaw-block-host');
            await waitForNotPresence('.jigsaw-loading-content');
            expectToExist('jigsaw-block', false);
            expectToExist('.jigsaw-ball-loading-host', false);
        })
    });

    describe('test bubble loading', () => {
        beforeEach(() => {
            browser.get('/loading/bubble');
        });
        it('should display correctly', async () => {
            const buttons = element.all(by.css('.jigsaw-button')),
                bubbles = element(by.css('.container1')).all(by.tagName('div'));
            buttons.get(0).click();
            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.jigsaw-block-host'))));
            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.container1'))));
            buttons.get(1).click();
            await waitForNotPresence('.container1');
            expectToExist('.jigsaw-bubble-loading-host', false);
            buttons.get(3).click();
            await waitForPresence('.jigsaw-button .jigsaw-bubble-loading-host');
            expectToExist('.jigsaw-button .jigsaw-bubble-loading-host', true);
        })
    });

    describe('test loading color', () => {
        it('should display color correctly', () => {
            browser.get('/loading/color');
            const bubbleEls = $$('jigsaw-bubble-loading');
            expect(bubbleEls.get(0).$('.spinner .circle1').getCssValue('background-color')).toBe('rgba(255, 0, 0, 1)');
            expect(bubbleEls.get(1).$('.spinner .circle1').getCssValue('background-color')).toBe('rgba(255, 165, 0, 1)');
            expect(bubbleEls.get(2).$('.spinner .circle1').getCssValue('background-color')).toBe('rgba(255, 255, 0, 1)');
            expect(bubbleEls.get(3).$('.spinner .circle1').getCssValue('background-color')).toBe('rgba(0, 255, 0, 1)');
        })
    });

    describe('test loading full', () => {
        it('input should be disabled after click submit', async () => {
            browser.get('/loading/full');
            const submitEls = $$('.jigsaw-button-color-primary'),
                testInput = $$('.content-box').get(1).$$('.content-line').get(0).$('input');
            submitEls.get(1).click();
            await waitForNotPresence('jigsaw-loading');
            expectToExist('jigsaw-loading',false);
        })
    })
});
