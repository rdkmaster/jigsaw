import {browser, element, by, ExpectedConditions} from 'protractor';
import {ILocation, until} from "selenium-webdriver";


describe('scrollbar', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test basic ', () => {
        beforeEach(() => {
            browser.get('/#/scrollbar/basic')
        });
        it('drag and drop scollbar', () => {
            const draggerEl = element(by.tagName('ng-component')).element(by.css('.mCSB_dragger'));
            expect(draggerEl.getCssValue('TOP')).toBe('0px');
            browser.actions().dragAndDrop(draggerEl,{x:0,y:200}).perform();
            browser.sleep(5000);
            expect(draggerEl.getCssValue('TOP')).toBe('70px');
        })
    });
});
