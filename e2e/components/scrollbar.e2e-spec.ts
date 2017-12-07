import {browser, element, by, ExpectedConditions} from 'protractor';
import {ILocation, until} from "selenium-webdriver";


describe('scrollbar', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test basic ', () => {
        beforeEach(() => {
            browser.get('/scrollbar/basic')
        });
        xit('drag and drop scollbar', async () => {
            const draggerEl = element(by.tagName('ng-component')).element(by.css('.mCSB_dragger'));
            await expect(draggerEl.getCssValue('TOP')).toBe('0px');
            await browser.actions().dragAndDrop(draggerEl, {x: 0, y: 200}).perform();
            await expect(draggerEl.getCssValue('TOP')).toBe('70px');
        })
    });
});
