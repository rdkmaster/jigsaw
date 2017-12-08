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
            buttons.get(0).click();
            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.jigsaw-block-host'))));
            await expect(loadingBlock.getCssValue('position')).toBe('absolute');
            await expect(loadingBlock.getCssValue('z-index')).toBe('1030');
            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.jigsaw-loading-content'))));
            await expectToExist(ballsEl.get(0));
            await expect(ballsEl.get(0).getCssValue('margin')).toBe('2px');
            await expect(element(by.css('.jigsaw-loading-content')).getCssValue('width')).toBe('70px');
            await expect(element(by.css('.jigsaw-loading-content')).getCssValue('margin-left')).toBe('-35px');
            // await expect(ballsEl.get(0).getCssValue('animation')).toBe('scale 0.75s cubic-bezier(0.2, 0.68, 0.18, 1.08) -0.24s infinite normal none running');
            // await expect(ballsEl.get(1).getCssValue('animation')).toBe('scale 0.75s cubic-bezier(0.2, 0.68, 0.18, 1.08) -0.12s infinite normal none running');
            // await expect(ballsEl.get(2).getCssValue('animation')).toBe('scale 0.75s cubic-bezier(0.2, 0.68, 0.18, 1.08) 0s infinite normal none running');
            buttons.get(1).click();
            await waitForNotPresence('.jigsaw-block-host');
            await waitForNotPresence('.jigsaw-loading-content');
            expectToExist('jigsaw-block', false);
            expectToExist('.jigsaw-ball-loading-host', false);
            buttons.get(2).click();
            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.jigsaw-block-host'))));
            await expectToExist('.jigsaw-block-host');
            // await expectPopupBlock('jigsaw-block');
            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.jigsaw-loading-content'))));
            await expectToExist(ballsEl.get(0));
            // await expect(ballsEl.get(0).getCssValue('animation')).toBe('scale 0.75s cubic-bezier(0.2, 0.68, 0.18, 1.08) -0.24s infinite normal none running');
            // await expect(ballsEl.get(1).getCssValue('animation')).toBe('scale 0.75s cubic-bezier(0.2, 0.68, 0.18, 1.08) -0.12s infinite normal none running');
            // await expect(ballsEl.get(2).getCssValue('animation')).toBe('scale 0.75s cubic-bezier(0.2, 0.68, 0.18, 1.08) 0s infinite normal none running');
        })
    });

    describe('test bubble loading', () => {
        it('should display correctly', async () => {
            await browser.get('/loading/bubble');
            const buttons = element.all(by.css('.jigsaw-button')),
                bubbles = element(by.css('.container1')).all(by.tagName('div'));
            buttons.get(0).click();
            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.jigsaw-block-host'))));
            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.container1'))));
            await expectToExist(bubbles.get(0));
            // await expect(bubbles.get(0).getCssValue('animation')).toBe('bouncedelay 1.2s ease-in-out 0s infinite normal both running');
            // await expect(bubbles.get(1).getCssValue('animation')).toBe('bouncedelay 1.2s ease-in-out -0.9s infinite normal both running');
            // await expect(bubbles.get(2).getCssValue('animation')).toBe('bouncedelay 1.2s ease-in-out -0.6s infinite normal both running');
            // await expect(bubbles.get(3).getCssValue('animation')).toBe('bouncedelay 1.2s ease-in-out -0.3s infinite normal both running');
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
        it('input should be disabled after click submit', () => {
            browser.get('/loading/full');
            const submitEls = $$('.jigsaw-button-color-primary'),
                testInput = $$('.content-box').get(1).$$('.content-line').get(0).$('input');
            submitEls.get(1).click();
            browser.sleep(300);
            expect(testInput.getAttribute('ng-reflect-is-disabled')).toBe('true');
        })
    })
});
