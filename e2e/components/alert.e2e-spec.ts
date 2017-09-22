import {browser, element, by, ExpectedConditions} from "protractor";
import {before} from "selenium-webdriver/testing";
import {offsetSpan} from "@angular/language-service/src/utils";
import {async} from "q";
// import {beforeEach, describe} from "selenium-webdriver/testing";

describe('alert', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test popup', () => {
        beforeEach(() => {
            browser.get('/#/alert/popup');
        });
        it('should be alert when click button popup and display ok when click definite ', async () => {
            const componentEl = element(by.tagName('ng-component')),
                alertButtonEl = componentEl.all(by.css('.jigsaw-button')),
                jigsawAlertEl = element(by.tagName('jigsaw-alert')),
                definiteEl = jigsawAlertEl.element(by.css('.jigsaw-button')),
                alertStateEl = componentEl.element(by.tagName('p'));
            alertButtonEl.get(0).click();
            await browser.wait(ExpectedConditions.presenceOf(element(by.tagName('jigsaw-alert'))));
            expect(alertStateEl.getText()).toBe('waiting for an answer');
            definiteEl.click();
            await browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.tagName('jigsaw-alert')))));
            expect(alertStateEl.getText()).toBe('great! your answer is: alert.button.ok');
            alertButtonEl.get(1).click();
            await browser.wait(ExpectedConditions.presenceOf(element(by.tagName('jigsaw-alert'))));
            expect(alertStateEl.getText()).toBe('waiting for an answer');
            definiteEl.click();
            await browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.tagName('jigsaw-alert')))));
            expect(alertStateEl.getText()).toBe('great! your answer is: alert.button.ok');
            alertButtonEl.get(2).click();
            await browser.wait(ExpectedConditions.presenceOf(element(by.tagName('jigsaw-alert'))));
            expect(alertStateEl.getText()).toBe('waiting for an answer');
            definiteEl.click();
            await browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.tagName('jigsaw-alert')))));
            expect(alertStateEl.getText()).toBe('great! your answer is: alert.button.ok');
        });
        it('should close alert when click "x"', async () => {
            const componentEl = element(by.tagName('ng-component')),
                alertButtonEl = componentEl.all(by.css('.jigsaw-button')),
                jigsawAlertEl = element(by.tagName('jigsaw-alert')),
                alertCloseEl = jigsawAlertEl.element(by.css('.jigsaw-alert-close')),
                alertStateEl = componentEl.element(by.tagName('p'));
            alertButtonEl.get(0).click();
            await browser.wait(ExpectedConditions.presenceOf(element(by.tagName('jigsaw-alert'))));
            alertCloseEl.click();
            await browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.tagName('jigsaw-alert')))));
            expect(alertStateEl.getText()).toBe('you closed the alert with the close button');
            alertButtonEl.get(1).click();
            await browser.wait(ExpectedConditions.presenceOf(element(by.tagName('jigsaw-alert'))));
            alertCloseEl.click();
            await browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.tagName('jigsaw-alert')))));
            expect(alertStateEl.getText()).toBe('you closed the alert with the close button');
        });
        it('should check color of warning and error alert', () => {
            const componentEl = element(by.tagName('ng-component')),
                alertButtonEl = componentEl.all(by.css('.jigsaw-button')),
                jigsawAlertEl = element(by.tagName('jigsaw-alert')),
                warningColorEl = jigsawAlertEl.element(by.tagName('jigsaw-button'));
            alertButtonEl.get(1).click();
            expect(warningColorEl.getCssValue('background-color')).toBe('rgba(231, 143, 78, 1)');
            jigsawAlertEl.element(by.css('.jigsaw-button')).click();
            browser.sleep(300);
            alertButtonEl.get(2).click();
            expect(warningColorEl.getCssValue('background-color')).toBe('rgba(236, 109, 109, 1)');
        });

    });
    describe('test customized', async() => {
        it('should change color when selected ', () => {
            browser.get('/#/alert/customized');
            const jigsawAlertEl = element(by.tagName('jigsaw-alert')),
                labelCheckboxEl = jigsawAlertEl.element(by.css('.jigsaw-checkbox'));
            labelCheckboxEl.click();
             // browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.css('.jigsaw-checkbox-checked')))));
            expect(jigsawAlertEl.element(by.css('.jigsaw-checkbox-checked')).isPresent()).toBe(true);
        })
    })
});
