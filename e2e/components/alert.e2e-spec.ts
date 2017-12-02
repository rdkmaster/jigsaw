import {browser, element, by, ExpectedConditions} from "protractor";
import {waitForNotPresence, waitForPresence} from "../utils/await";
import {expectPopupByModal} from "../utils/popup";

describe('alert', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test popup', () => {
        beforeEach(async() => {
          await  browser.get('/alert/popup');
          await browser.sleep(300);
        });
        it('should be alert when click button popup and display ok when click definite and "x" ', async () => {
            const componentEl = element(by.tagName('ng-component')),
                alertButtonEl = element(by.css('.app-wrap')).all(by.tagName('jigsaw-button')),
                jigsawAlertEl = element(by.tagName('jigsaw-alert')),
                definiteEl = jigsawAlertEl.element(by.css('.jigsaw-button')),
                alertCloseEl = jigsawAlertEl.element(by.css('.jigsaw-alert-head')).all(by.tagName('SPAN')).get(1),
                alertStateEl = componentEl.element(by.tagName('p'));
            await expect(alertButtonEl.get(0).getText()).toBe('通用信息提示框');
                  alertButtonEl.get(0).click();
            await waitForPresence('jigsaw-alert');
            await expect(alertStateEl.getText()).toBe('waiting for an answer');
                  definiteEl.click();
            await waitForNotPresence('jigsaw-alert');
            await expect(alertStateEl.getText()).toBe('great! your answer is: alert.button.ok');
            await browser.navigate().refresh();
                  alertButtonEl.get(1).click();
            await waitForPresence('jigsaw-alert');
            await expect(alertStateEl.getText()).toBe('waiting for an answer');
                  definiteEl.click();
            await waitForNotPresence('jigsaw-alert');
            await expect(alertStateEl.getText()).toBe('great! your answer is: alert.button.ok');
            await browser.navigate().refresh();
                  alertButtonEl.get(2).click();
            await waitForPresence('jigsaw-alert');
            await expect(alertStateEl.getText()).toBe('waiting for an answer');
                  definiteEl.click();
            await waitForNotPresence('jigsaw-alert');
            await expect(alertStateEl.getText()).toBe('great! your answer is: alert.button.ok');
            await browser.navigate().refresh();
            await alertButtonEl.get(0).click();
            await waitForPresence('.jigsaw-alert-close');
            await alertCloseEl.click();
            await waitForNotPresence('jigsaw-alert');
            await expect(alertStateEl.getText()).toBe('you closed the alert with the close button');
        });

        it('should check color of warning and error alert', async() => {
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
            browser.get('/alert/customized');
            const jigsawAlertEl = element(by.tagName('jigsaw-alert')),
                labelCheckboxEl = jigsawAlertEl.element(by.css('.jigsaw-checkbox'));
            labelCheckboxEl.click();
            expect(jigsawAlertEl.element(by.css('.jigsaw-checkbox-checked')).isPresent()).toBe(true);
        })
    })
});
