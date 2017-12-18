import {$$, $, browser, element, by} from "protractor";
import {mouseMove} from "../utils/actions";
import {waitForPresence} from "../utils/await";
import {WebDriver} from "selenium-webdriver";

describe('list', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test list full', () => {
        beforeEach(() => {
            browser.get('/list/full');
        });
        it('menu should be select correctly', async () => {
            const list1options = $('.demo-1').$$('j-list-option'),
                list2options = $('.demo-2').$$('j-list-option'),
                list3options = $('.demo-3').$$('j-list-option'),
                list4options = $$('j-list').last().$$('j-list-option'),
                messages = $$('.message');
            list1options.get(0).click();
            expect(messages.get(0).$('span').getText()).toBe('bicycle');
            list1options.get(4).click();
            expect(messages.get(0).$('span').getText()).toBe('book');
            list2options.get(0).click();
            expect(messages.get(1).$('span').getText()).toBe('Settings');
            list2options.get(3).click();
            expect(messages.get(1).$('span').getText()).toBe('Exit');
            expect(messages.get(2).$('span').getText()).toBe('bicycle,book');
            list3options.get(0).click();
            list3options.get(2).click();
            list3options.get(3).click();
            expect(messages.get(2).$('span').getText()).toBe('book,football');
            mouseMove($('.demo-4').$('j-combo-select'));
            await waitForPresence('.jigsaw-combo-select-opened');
            list4options.get(1).click();
            list4options.get(2).click();
            list4options.get(3).click();
            expect($('j-combo-select').$$('jigsaw-tag').count()).toBe(3);
        });
    });
})
