import {browser, element, by} from 'protractor';
import {ILocation} from "selenium-webdriver";

describe('slider', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test basic ', () => {
        beforeEach(() => {
            browser.get('/#/slider/basic')
        });
        it('shoud drag and drop slider', () => {
            const sliderHandle = element.all(by.css('.jigsaw-slider-handle')),
                spanEl = element.all(by.tagName('ng-component span')),
                sliderSwitch = element(by.css('.jigsaw-switch-small')),
            sliderTrack=element.all(by.tagName('jigsaw-slider')).get(3).element(by.css('.jigsaw-slider-track'));
            expect(spanEl.get(0).getText()).toBe('取值: 30');
            browser.actions().dragAndDrop(sliderHandle.get(0), {x: 20000, y: 0}).perform();
            expect(spanEl.get(0).getText()).toBe('取值: 100');
            browser.actions().dragAndDrop(sliderHandle.get(0), {x: -20000, y: 0}).perform();
            expect(spanEl.get(0).getText()).toBe('取值: 10');
            sliderSwitch.click();
            browser.actions().dragAndDrop(sliderHandle.get(0), {x: 20000, y: 0}).perform();
            expect(spanEl.get(0).getText()).toBe('取值: 10');
            browser.actions().dragAndDrop(sliderHandle.get(1), {x: -20000, y: 0}).perform();browser.sleep(400);
            expect(spanEl.get(1).getText()).toBe('取值: 1');
            browser.actions().dragAndDrop(sliderHandle.get(1), {x: 20000, y: 0}).perform();browser.sleep(400);
            expect(spanEl.get(1).getText()).toBe('取值: 20');
            expect(element.all(by.tagName('jigsaw-slider')).get(2).getAttribute('step')).toBe('0.01');
            // browser.actions().dragAndDrop(sliderHandle.get(3), {x: -200, y: 0}).perform();browser.sleep(500);
            // expect(sliderHandle.get(3).getAttribute('left')).toBe('17%');
            // browser.actions().dragAndDrop(sliderHandle.get(4), {x: -200, y: 0}).perform();browser.sleep(500);
            // expect(sliderHandle.get(4).getAttribute('left')).toBe('47%');
        });

    });
});
