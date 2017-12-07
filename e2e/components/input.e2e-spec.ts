import {browser, element, by, protractor} from "protractor";

describe('input', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test bidirectional bindings and clearable', () => {
        beforeEach(() => {
            browser.get('/input/basic');
        });

        it('should update bind property when input value', () => {
            const inputEl = element(by.id('test-input')),
                input = inputEl.element(by.tagName('input')),
                bindProperty = element(by.id('bind-property'));

            input.sendKeys('abc123');
            expect(input.getAttribute('value')).toBe('abc123');
            expect(bindProperty.getText()).toBe('abc123');

            const clearBar = inputEl.element(by.css('.jigsaw-input-clear-bar'));
            clearBar.click();
        });

        it('should clear value when click the clear bar', () => {
            const inputEl = element(by.id('test-input')),
                input = inputEl.element(by.tagName('input')),
                clearBar = inputEl.element(by.css('.jigsaw-input-clear-bar'));

            input.sendKeys('abc123');
            expect(input.getAttribute('value')).toBe('abc123');
            clearBar.click();
            expect(input.getAttribute('value')).toBe('');
        })
    });

    describe('test prefix icon', () => {

        beforeEach(() => {
            browser.get('/input/prefix-icon');
        });

        it('should be mapped into component and display prefix icon', () => {
            const prefixIcons = element(by.id('test-input')).all(by.tagName('a')),
                input = element(by.id('test-input')).element(by.tagName('input'));
            input.sendKeys('asf');
            prefixIcons.get(0).click();
            browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000);
            const alertDialog = browser.switchTo().alert();
            expect(alertDialog.getText()).toEqual("你输入的值是 asf");
            alertDialog.accept();
            prefixIcons.get(1).click();
            browser.wait(protractor.ExpectedConditions.alertIsPresent(), 1000);
            expect(alertDialog.getText()).toEqual("你输入的值是 asf");
            alertDialog.accept();
        })
    });

    describe('test focus', () => {
        beforeEach(() => {
            browser.get('/input/focus')
        });

        it('should be focused when call focus function', () => {
            const callFunctionEl = element(by.id('call-function'));
            const focusMessage = element(by.id('focus-message'));
            callFunctionEl.click();
            expect(focusMessage.getText()).toBe('input component focused');
        })
    });
});
