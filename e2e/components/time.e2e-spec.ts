import {browser, element, by, ExpectedConditions} from "protractor";
import {until} from "selenium-webdriver";
import elementLocated = until.elementLocated;

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
            expect(daysYearEl.getText()).toBe('October 2017');
            daysYearEl.click();
            pickerMonth.all(by.tagName('SPAN')).get(5).click();
            expect(daysYearEl.getText()).toBe('April 2017');
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
                limitEndOp = element.all(by.tagName('jigsaw-tile-option')),
                pickerDays = element(by.css('.datepicker-days'));
            expect(pEl.getText()).toBe('Selected Time : 2017-09-20');
            pickerDays.all(by.tagName('TR')).get(3).all(by.tagName('TD')).get(4).click();
            expect(pEl.getText()).toBe('Selected Time : 2017-09-07');
            limitEndOp.get(1).click();
            pickerDays.all(by.tagName('TR')).get(5).all(by.tagName('TD')).get(4).click();
            expect(pEl.getText()).toBe('Selected Time : 2017-09-21');
            limitEndOp.get(0).click();
            expect(pEl.getText()).toBe('Selected Time : 2017-09-20');
        })
    });
    describe('test time', () => {
        beforeEach(() => {
            browser.get('/#/time/weekStart');
        });
        it('should be set', () => {
            const weekStartOp = element.all(by.tagName('jigsaw-tile-option')),
                weekStartEl = element(by.css('.datepicker-days')).all(by.tagName('TR')).get(1).all(by.tagName('TH')).get(0);
              expect(weekStartEl.getText()).toBe('日');
            weekStartOp.get(1).click();
            expect(weekStartEl.getText()).toBe('一');
        })
    });
});
