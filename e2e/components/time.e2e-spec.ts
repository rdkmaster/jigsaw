import {browser, element, by, ExpectedConditions} from "protractor";
import {until} from "selenium-webdriver";
import elementLocated = until.elementLocated;

xdescribe('time', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    xdescribe('test time', () => {
        beforeEach(() => {
            browser.get('/#/time/limitEnd');
        });
        it('should not be selected when choose time beyond the limit end ', async () => {
            const limitEndOp = element.all(by.tagName('jigsaw-tile-option')),
                limitDays = element(by.css('.datepicker-days')).element(by.tagName('TBODY')).all(by.css('.disabled')),
                pEl = element(by.css('.demo-content')).element(by.tagName('P')),
                nowLimitDaysNum = limitDays.count();
            let date = new Date();
            expect(pEl.getText()).toBe('Selected Time : ' + date.toJSON().substr(0, 10));
            await element(by.css('.datepicker-days')).all(by.tagName('TR')).get(7).all(by.tagName('TD')).get(6).click();
            expect(pEl.getText()).toBe('Selected Time : ' + date.toJSON().substr(0, 10));
            await  limitEndOp.get(1).click();
            expect(limitDays.count()).not.toBe(nowLimitDaysNum);
            await limitEndOp.get(0).click();
            expect(limitDays.count()).toBe(nowLimitDaysNum);
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
            expect(weekStartEl.getText()).toBe('Su');
        })
    });
    describe('test gr', () => {
        beforeEach(() => {
            browser.get('/#/time/gr');
        });
        it('test second hour week gr', async () => {
            const grEl = element.all(by.tagName('jigsaw-tile-option')),
                clockEl = element(by.css('.list-unstyled .accordion-toggle .glyphicon-time')),
                activeWeekEl = element(by.css('.datepicker-days .table-condensed .active'));
            grEl.get(0).click();
            clockEl.click();
            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.timepicker-hour'))));
            expect(element(by.css('.timepicker-second')).getAttribute('TITLE')).toBe('Pick Second');
            grEl.get(2).click();
            clockEl.click();
            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.timepicker-hour'))));
            expect(element(by.css('.timepicker-hour')).getAttribute('TITLE')).toBe('Pick Hour');
            grEl.get(4).click();
            expect(activeWeekEl.all(by.tagName('TD')).get(0).getCssValue('background-color')).toBe('rgba(65, 173, 220, 1)');
            expect(activeWeekEl.all(by.tagName('TD')).get(6).getCssValue('background-color')).toBe('rgba(65, 173, 220, 1)');
        })
    });
    describe('test gr', () => {
        beforeEach(() => {
            browser.get('/#/time/recommended');
        });
        it('should check recommend days', () => {
            expect(element.all(by.css('.expect-day')).get(0).getCssValue('border-radius')).toBe('4px 0px 0px 4px');
            expect(element.all(by.css('.expect-day')).get(5).getCssValue('border-radius')).toBe('0px 4px 4px 0px');
        })
    });
    describe('test grItems', () => {
        beforeEach(() => {
            browser.get('/#/time/grItems');
        });
        it('test time granularity', () => {
            const granularityOp = element(by.css('.jigsaw-time-granularity')).all(by.tagName('SPAN')),
                activeWeekEl = element(by.css('.jigsaw-time-box .datepicker-days .active')).all(by.tagName('TD')),
            activeMonth=element(by.css('.datepicker-months .active'));
            expect(element(by.css('.datepicker-days .active')).getCssValue('background-color')).toBe('rgba(65, 173, 220, 1)');
            granularityOp.get(1).click();
            expect(activeWeekEl.get(0).getCssValue('background-color')).toBe('rgba(65, 173, 220, 1)');
            expect(activeWeekEl.get(6).getCssValue('background-color')).toBe('rgba(65, 173, 220, 1)');
            granularityOp.get(2).click();
            expect(activeMonth.getCssValue('background-color')).toBe('rgba(65, 173, 220, 1)');
        })
    });
    describe('test grItems', () => {
        beforeEach(() => {
            browser.get('/#/time/refreshInterval');
        });
        it('test refreshInterval',()=>{
        })
    });
});
