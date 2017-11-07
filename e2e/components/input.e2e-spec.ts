import {browser, element, by} from "protractor";

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
            browser.get('/input/prefixIcon');
        });

        it('should be mapped into component and display prefix icon', () => {
            const inputEl = element(by.id('test-input'));
            expect(inputEl.element(by.css('.jigsaw-input-icon-front .fa-search')).isPresent()).toBe(true);
            expect(inputEl.element(by.css('.jigsaw-input-icon-front .fa-save')).isPresent()).toBe(true);
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
