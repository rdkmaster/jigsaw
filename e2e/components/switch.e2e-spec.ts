import {browser, element, by, ExpectedConditions} from 'protractor';

describe('switch', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test basic function', () => {
        beforeEach(() => {
            browser.get('switch/basic');
        });

        it('should change the binding property when change the checked state', async () => {
            const switchEl = element(by.id('test-switch1'));
            const result = element(by.id('result-message'));
            switchEl.click();
            expect(result.getText()).toBe('result: true');
            switchEl.click();
            expect(result.getText()).toBe('result: false');
        });

        it('should click invalid when set disabled', () => {
            const switchEl = element(by.id('test-switch2'));
            expect(switchEl.element(by.css('.jigsaw-switch-disabled')).isPresent()).toBe(true);
            switchEl.click();
            expect(switchEl.element(by.css('.jigsaw-switch-disabled')).isPresent()).toBe(true);
        });

        it('should render onLabel and offLabel when set onLabel and offLabel', () => {
            const switchEl = element(by.id('test-switch3'));
            expect(switchEl.element(by.css('.jigsaw-switch-inner')).getText()).toBe('Jigsaw is perfect!');
            switchEl.click();
            expect(switchEl.element(by.css('.jigsaw-switch-inner')).getText()).toBe('Jigsaw is great!');
            switchEl.click();
            expect(switchEl.element(by.css('.jigsaw-switch-inner')).getText()).toBe('Jigsaw is perfect!');
        })
    })
});
