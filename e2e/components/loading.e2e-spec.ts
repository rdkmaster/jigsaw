import {browser, element, by, $$, ExpectedConditions} from 'protractor';
import {expectToExist} from "../utils/asserts";
import {expectPopupBlock} from "../utils/popup";
import {waitForNotPresence, waitForPresence} from "../utils/await";

describe('loading', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test ball loading', () => {
        it('should display correctly', async () => {
            await browser.get('/loading/ball');
            const buttons = element.all(by.css('.jigsaw-button')),
                loadingBlock = element(by.tagName('jigsaw-block')),
                ballsEl = element(by.css('.jigsaw-loading-content')).all(by.tagName('div'));
            await buttons.get(0).click();
            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.jigsaw-block-host'))));
            expect(await loadingBlock.getCssValue('position')).toBe('absolute');
            expect(await loadingBlock.getCssValue('z-index')).toBe('1000');
            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.jigsaw-loading-content'))));
            expect(await element(by.css('.jigsaw-loading-content')).getCssValue('width')).toBe('70px');
            expect(await element(by.css('.jigsaw-loading-content')).getCssValue('margin-left')).toBe('-35px');
            await buttons.get(1).click();
            await waitForNotPresence('.jigsaw-block-host');
            await waitForNotPresence('.jigsaw-loading-content');
            await expectToExist('jigsaw-block', false);
            await expectToExist('.jigsaw-ball-loading-host', false);
        })
    });

    describe('test bubble loading', () => {
        it('should display correctly', async () => {
            await browser.get('/loading/bubble');
            const buttons = element.all(by.css('.jigsaw-button')),
                bubbles = element(by.css('.container1')).all(by.tagName('div'));
            await buttons.get(0).click();
            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.jigsaw-block-host'))));
            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.container1'))));
            await buttons.get(1).click();
            await waitForNotPresence('.container1');
            await expectToExist('.jigsaw-bubble-loading-host', false);
            await buttons.get(3).click();
            await waitForNotPresence('.jigsaw-button .jigsaw-bubble-loading-host');
            await expectToExist('.jigsaw-button .jigsaw-bubble-loading-host', false);
        })
    });

    describe('test loading color', () => {
        it('should display color correctly', async () => {
            await browser.get('/loading/color');
            const bubbleEls = $$('jigsaw-bubble-loading');
            expect(await bubbleEls.get(0).$('.spinner .circle1').getCssValue('background-color')).toBe('rgba(255, 0, 0, 1)');
            expect(await bubbleEls.get(1).$('.spinner .circle1').getCssValue('background-color')).toBe('rgba(255, 165, 0, 1)');
            expect(await bubbleEls.get(2).$('.spinner .circle1').getCssValue('background-color')).toBe('rgba(255, 255, 0, 1)');
            expect(await bubbleEls.get(3).$('.spinner .circle1').getCssValue('background-color')).toBe('rgba(0, 255, 0, 1)');
        })
    });

    describe('test loading full', () => {
        it('input should be disabled after click submit', async () => {
            await browser.get('/loading/full');
            const submitEls = $$('.jigsaw-button-color-primary'),
                testInput = $$('.content-box').get(1).$$('.content-line').get(0).$('input');
            await submitEls.get(1).click();
            await waitForNotPresence('jigsaw-loading');
            await expectToExist('jigsaw-loading', false);
        })
    })
});
