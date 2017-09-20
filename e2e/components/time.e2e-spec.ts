import {browser, element, by, ExpectedConditions} from "protractor";

describe('time', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test time', () => {
        beforeEach(() => {
            browser.get('/#/time/basic');
        });
        it('should check selected time', () => {
            const pEl = element(by.css('.demo-content')).element(by.tagName('P')),
                nextMonth = element(by.css('.datepicker-days')).element(by.css('.next')),
                daysYearEl = element(by.css('.datepicker-days')).element(by.css('.picker-switch')),
                pickerMonth = element(by.css('.datepicker-months')),
                pickerYear = element(by.css('.datepicker-years')),
                pickerDecades = element(by.css('.datepicker-decades'));
            expect(pEl.getText()).toBe('Selected Time : 2017-09-20');
            expect(element(by.css('.datepicker-days')).element(by.css('.old')).getCssValue('color')).toBe('rgba(153, 153, 153, 1)');
            expect(element(by.css('.datepicker-days')).element(by.css('.new')).getCssValue('color')).toBe('rgba(153, 153, 153, 1)');
            nextMonth.click();
            expect(daysYearEl.getText()).toBe('十月 2017');
            daysYearEl.click();
            pickerMonth.all(by.tagName('SPAN')).get(5).click();
            expect(daysYearEl.getText()).toBe('四月 2017');
            daysYearEl.click();
            expect(pickerMonth.element(by.css('.picker-switch')).getText()).toBe('2017');
            pickerMonth.element(by.css('.picker-switch')).click();
            expect(pickerYear.element(by.css('.picker-switch')).getText()).toBe('2012-2023');
            pickerYear.element(by.css('.picker-switch')).click();
            expect(pickerDecades.element(by.css('.picker-switch')).getText()).toBe('2000-2107');
            pickerDecades.all(by.tagName('SPAN')).get(3).click();
            pickerYear.all(by.tagName('SPAN')).get(7).click();
            pickerMonth.all(by.tagName('SPAN')).get(10).click();
            expect(pEl.getText()).toBe('Selected Time : 2017-09-20');
        })
    });
    describe('test time', () => {
        beforeEach(() => {
            browser.get('/#/time/limitEnd');
        });
        it('should not be selected when choose time beyond the limit end ', () => {
            const pEl = element(by.css('.demo-content')).element(by.tagName('P')),
                pickerDays = element(by.css('.datepicker-days'));
            expect(pEl.getText()).toBe('Selected Time : 2017-09-20');
            pickerDays.all(by.tagName('TR')).get(3).all(by.tagName('TD')).get(4).click();
            expect(pEl.getText()).toBe('Selected Time : 2017-09-07');
            pickerDays.all(by.tagName('TR')).get(6).all(by.tagName('TD')).get(4).click();
            expect(pEl.getText()).toBe('Selected Time : 2017-09-07');
        })
    });
});
