import {browser, element, by, $, $$} from 'protractor';
import {ILocation, until} from "selenium-webdriver";


describe('slider', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test basic ', () => {
        beforeEach(() => {
            browser.get('/slider/basic');
        });
        it('shoud drag and drop slider', async () => {
            const messages = $$('.message'),
                sliderHandle = element.all(by.css('.jigsaw-slider-handle')),
                handleTag = element.all(by.tagName('slider-handle')),
                spanEl = element.all(by.tagName('ng-component span')),
                sliderSwitch = element(by.css('.jigsaw-switch-small')),
                sliderTrack = element.all(by.tagName('jigsaw-slider')).get(3).element(by.css('.jigsaw-slider-track'));
            expect(messages.get(0).getText()).toBe('取值: 30');
            browser.actions().dragAndDrop($('.demo-1 .jigsaw-slider-handle'), {x: 1000, y: 0}).perform();
            expect(messages.get(0).getText()).toBe('取值: 100');

            browser.actions().dragAndDrop($('.demo-2 .jigsaw-slider-handle'), {x: -2000, y: 0}).perform();
            expect(messages.get(1).getText()).toBe('取值: 1');
            browser.actions().dragAndDrop($('.demo-2 .jigsaw-slider-handle'), {x: 2000, y: 0}).perform();
            expect(messages.get(1).getText()).toBe('取值: 20');

            browser.actions().dragAndDrop($('.demo-3 .jigsaw-slider-handle'), {x: 2000, y: 0}).perform();
            expect(messages.get(2).getText()).toBe('取值: 2');

            expect($('.demo-4').$$('.jigsaw-slider-handle').count()).toBe(3);

            browser.actions().dragAndDrop($('.demo-5 .jigsaw-slider-handle'), {x: 2000, y: 0}).perform();
            expect($('.demo-5 .jigsaw-slider .jigsaw-slider-track').getCssValue('width')).toBe($('.demo-5 .jigsaw-slider').getCssValue('width'));

            browser.actions().dragAndDrop($('.demo-6 .jigsaw-slider-handle'), {x:0, y: -1000}).perform();
            expect(messages.get(3).getText()).toBe('100');

        });
    });
});
