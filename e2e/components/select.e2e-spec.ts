import {browser, element, by, $, $$} from "protractor";
import {mouseMove, expectToExist, waitForNotPresence, waitForPresence} from "../utils/index";

describe('select', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test basic drop down and select', () => {
        beforeEach(() => {
            browser.get('/select/basic');
        });

        it('should drop down by hover and click option can select', async () => {
            const selectEl = $('#test-select');

            // mouse enter
            mouseMove(selectEl);
            await waitForPresence('.jigsaw-list-option');
            expectToExist('.jigsaw-list-option');

            // mouse leave
            /*mouseMove($('body'));
            await waitForNotPresence('.jigsaw-list-option');
            expectToExist('.jigsaw-list-option', false);

            mouseMove(selectEl);
            await waitForPresence('.jigsaw-list-option');
            expectToExist('.jigsaw-list-option');*/

            // select
            const optionIndexOf2 = $$('.jigsaw-list-option').get(2);
            optionIndexOf2.click();
            const selectedEl = selectEl.element(by.css('.jigsaw-combo-select-selection jigsaw-tag span'));
            expect(selectedEl.getText()).toBe(optionIndexOf2.getText());

            await waitForNotPresence('.jigsaw-list-option');
            expectToExist('.jigsaw-list-option', false);
        });

    });

    describe('test toggle click', () => {
        beforeEach(() => {
            browser.get('/select/trigger');
        });

        it('should drop down by click', async () => {
            const selectEl = $('#test-select');

            // click open
            selectEl.click();
            await waitForPresence('.jigsaw-list-option');
            expectToExist('.jigsaw-list-option');

            // click close
            selectEl.click();
            await waitForNotPresence('.jigsaw-list-option');
            expectToExist('.jigsaw-list-option', false);

            // click body
            selectEl.click();
            await waitForPresence('.jigsaw-list-option');
            expectToExist('.jigsaw-list-option');
            $('body').click();
            await waitForNotPresence('.jigsaw-list-option');
        })
    })
});
