import {browser, element, by, ExpectedConditions} from 'protractor';
import {ILocation, until} from "selenium-webdriver";


describe('slider', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test basic ', () => {
        beforeEach(() => {
            browser.get('/#/slider/basic')
        });
        it('shoud drag and drop slider', async () => {
            const sliderHandle = element.all(by.css('.jigsaw-slider-handle')),
                handleTag = element.all(by.tagName('slider-handle')),
                spanEl = element.all(by.tagName('ng-component span')),
                sliderSwitch = element(by.css('.jigsaw-switch-small')),
                sliderTrack = element.all(by.tagName('jigsaw-slider')).get(3).element(by.css('.jigsaw-slider-track'));
            await expect(handleTag.get(0).getAttribute('ng-reflect-value')).toBe('30');
            await browser.actions().mouseDown(sliderHandle.get(0)).mouseMove({x: 1000, y: 0}).mouseUp().perform();
            await  expect(handleTag.get(0).getAttribute('ng-reflect-value')).toBe('100');

            await browser.actions().mouseDown(sliderHandle.get(0)).mouseMove({x: -5000, y: 0}).mouseUp().perform();

            await    sliderSwitch.click();
            await  browser.actions().mouseDown(sliderHandle.get(1)).mouseMove({x: 5000, y: 0}).mouseUp().perform();

            await   expect(handleTag.get(0).getAttribute('ng-reflect-value')).toBe('10');

            await browser.actions().mouseDown(sliderHandle.get(1)).mouseMove({x: -5000, y: 0}).mouseUp().perform();

            await   expect(handleTag.get(1).getAttribute('ng-reflect-value')).toBe('1');
            await  browser.actions().mouseDown(sliderHandle.get(1)).mouseMove({x: 5000, y: 0}).mouseUp().perform();

            await   expect(handleTag.get(1).getAttribute('ng-reflect-value')).toBe('20');

            await    expect(element.all(by.tagName('jigsaw-slider')).get(2).getAttribute('step')).toBe('0.01');

            await browser.actions().mouseDown(sliderHandle.get(3)).mouseMove({x: -5000, y: 0}).mouseUp().perform();
            await expect(handleTag.get(3).getAttribute('ng-reflect-value')).toBe('0');
            await browser.actions().mouseDown(sliderHandle.get(5)).mouseMove({x: 5000, y: 0}).mouseUp().perform();
            await   expect(handleTag.get(5).getAttribute('ng-reflect-value')).toBe('100');

            await browser.actions().mouseDown(sliderHandle.get(7)).mouseMove({x: 0, y: 5000}).mouseUp().perform();
            await   expect(handleTag.get(7).getAttribute('ng-reflect-value')).toBe('0');
            await  browser.actions().mouseDown(sliderHandle.get(8)).mouseMove({x: 0, y: -5000}).mouseUp().perform();

            await  expect(handleTag.get(8).getAttribute('ng-reflect-value')).toBe('100');

            await browser.actions().mouseDown(sliderHandle.get(9)).mouseMove({x: 0, y: 5000}).mouseUp().perform();
            await  expect(handleTag.get(9).getAttribute('ng-reflect-value')).toBe('20');
        });
    });
});
