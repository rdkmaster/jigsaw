import {browser, element, by} from 'protractor';

describe('checkbox', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test change state', () => {
        beforeEach(() => {
            browser.get('/checkbox/basic');
        });

        it('should  change state when click the checkbox', () => {
            const checkboxEl = element(by.id('test-checkbox'));
            const stateMessage = element(by.id('state-message'));
            const setMiddleState = element(by.id('set-middle-state'));

            //toggle
            expect(stateMessage.getText()).toBe('The checkbox value is 0!');
            checkboxEl.click();
            expect(stateMessage.getText()).toBe('The checkbox value is 1!');
            checkboxEl.click();
            expect(stateMessage.getText()).toBe('The checkbox value is 0!');

            //middle state
            setMiddleState.click();
            expect(stateMessage.getText()).toBe('The checkbox value is 0!');
            checkboxEl.click();
            expect(stateMessage.getText()).toBe('The checkbox value is 1!');
            checkboxEl.click();
            expect(stateMessage.getText()).toBe('The checkbox value is 2!');
            checkboxEl.click();
            expect(stateMessage.getText()).toBe('The checkbox value is 0!');
        })
    });

    describe('test disabled', () => {
        beforeEach(() => {
            browser.get('/checkbox/disabled');
        });

        it('should disabled when set disabled', () => {
            const checkboxEl = element(by.id('test-checkbox'));
            const stateMessage = element(by.id('state-message'));
            const closeDisabled = element(by.id('close-disabled'));

            expect(checkboxEl.element(by.css('.jigsaw-checkbox-disabled')).isPresent()).toBe(true);
            expect(stateMessage.getText()).toBe('The checkbox value is 0!');
            checkboxEl.click();
            expect(stateMessage.getText()).toBe('The checkbox value is 0!');

            closeDisabled.click();
            checkboxEl.click();
            expect(stateMessage.getText()).toBe('The checkbox value is 1!');
        })
    })
});
