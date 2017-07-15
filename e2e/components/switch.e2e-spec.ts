import {browser, element, by, ExpectedConditions} from 'protractor';

describe('switch', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test basic function', () => {
        beforeEach(() => {
            browser.get('switch/basic');
        });

        it('should emit checkedChange event when change the checked state', async () => {
            const switchEl = element(by.id('test-switch1'));
            switchEl.click();
            const alert = browser.driver.switchTo().alert();
            expect(alert.getText()).toBe('switch message is: true');
            alert.dismiss();
            await browser.wait(ExpectedConditions.not(ExpectedConditions.alertIsPresent()));
            switchEl.click();
            expect(browser.driver.switchTo().alert().getText()).toBe('switch message is: false');
            alert.dismiss();
        });

        it('should click invalid when set disabled', () => {
            const switchEl = element(by.id('test-switch2'));
            expect(switchEl.element(by.css('.jigsaw-switch-disabled')).isPresent()).toBe(true);
            switchEl.click();
            expect(switchEl.element(by.css('.jigsaw-switch-disabled')).isPresent()).toBe(true);
        });

        it('should render onLabel and offLabel when set onLabel and offLabel', () => {
            const switchEl = element(by.id('test-switch3'));
            expect(switchEl.element(by.css('.jigsaw-switch-inner')).getText()).toBe('b');
            switchEl.click();
            expect(switchEl.element(by.css('.jigsaw-switch-inner')).getText()).toBe('a');
            switchEl.click();
            expect(switchEl.element(by.css('.jigsaw-switch-inner')).getText()).toBe('b');
        })
    })
});
