import {browser, element, by} from "protractor";

describe('select', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test basic functions', () => {
        beforeEach(() => {
            browser.get('/#/select/basic');
        });

        it('should drop down or drop up option list when click the component or option list or body', () => {
            const selectEl = element(by.id('test-select')),
                optionListEl = selectEl.element(by.css('.jigsaw-select-option-list')),
                optionEl1 = optionListEl.all(by.tagName('jigsaw-select-option')).get(1);

            //toggle
            expect(optionListEl.getCssValue('opacity')).toBe('0');
            selectEl.click();
            browser.sleep(300);
            expect(optionListEl.getCssValue('opacity')).toBe('1');
            selectEl.click();
            browser.sleep(300);
            expect(optionListEl.getCssValue('opacity')).toBe('0');

            //click option
            selectEl.click();
            browser.sleep(300);
            expect(optionListEl.getCssValue('opacity')).toBe('1');
            optionEl1.click();
            browser.sleep(300);
            expect(optionListEl.getCssValue('opacity')).toBe('0');

            //click body
            selectEl.click();
            browser.sleep(300);
            expect(optionListEl.getCssValue('opacity')).toBe('1');
            browser.actions().mouseMove(element(by.tagName('body'))).click().perform();
            browser.sleep(300);
            expect(optionListEl.getCssValue('opacity')).toBe('0');
        });

        it('should select the clicked option when click the option', () => {
            const selectEl = element(by.id('test-select')),
                optionListEl = selectEl.element(by.css('.jigsaw-select-option-list')),
                optionEl1 = optionListEl.all(by.tagName('jigsaw-select-option')).get(1),
                optionEl2 = optionListEl.all(by.tagName('jigsaw-select-option')).get(2);

            selectEl.click();
            browser.sleep(300);

            //选择第二项
            const optionElText1 = optionEl1.element(by.css('.jigsaw-option')).getText();
            optionEl1.click();
            expect(selectEl.element(by.css('.jigsaw-select')).getText()).toBe(optionElText1);
            expect(optionEl1.element(by.css('.jigsaw-option-on')).isPresent()).toBe(true);

            selectEl.click();
            browser.sleep(300);

            //选择第三项
            const optionElText2 = optionEl2.element(by.css('.jigsaw-option')).getText();
            optionEl2.click();
            expect(selectEl.element(by.css('.jigsaw-select')).getText()).toBe(optionElText2);
            expect(optionEl2.element(by.css('.jigsaw-option-on')).isPresent()).toBe(true);
            expect(optionEl1.element(by.css('.jigsaw-option-on')).isPresent()).toBe(false);
        })
    })
});
