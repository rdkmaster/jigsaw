import {browser, element, by, ExpectedConditions} from "protractor";
import {until} from "selenium-webdriver";
import elementLocated = until.elementLocated;

describe('time', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test time', () => {
        beforeEach(() => {
            browser.get('/#/time/limitEnd');
        });
        it('should not be selected when choose time beyond the limit end ', () => {
            const limitEndOp = element.all(by.tagName('jigsaw-tile-option')),
                limitDays = element(by.css('.datepicker-days')).element(by.tagName('TBODY')).all(by.css('.disabled')),
            initialLimitDaysNum=limitDays.count();
            limitEndOp.get(1).click();
            expect(limitDays.count()).not.toBe(initialLimitDaysNum);
            limitEndOp.get(0).click();
            expect(limitDays.count()).toBe(initialLimitDaysNum);
        })
    });

    describe('test time', () => {
        beforeEach(() => {
            browser.get('/#/time/weekStart');
        });
        it('should be set', () => {
            const weekStartOp = element.all(by.tagName('jigsaw-tile-option')),
                weekStartEl = element(by.css('.datepicker-days')).all(by.tagName('TR')).get(1).all(by.tagName('TH')).get(0);
              expect(weekStartEl.getText()).toBe('Su');
            weekStartOp.get(3).click();
            expect(weekStartEl.getText()).toBe('We');
        })
    });
});
