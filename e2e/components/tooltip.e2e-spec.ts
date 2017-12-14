import {browser, $, $$} from 'protractor';
import {expectStringFromAlert, expectToExist,waitForPresence,mouseMove} from "../utils/index";


describe('tooltip', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test tooltip ', () => {
        it('shoud popup tooltip dialog when mouse move to the button', async () => {
            await browser.get('/tooltip/dialog');
            mouseMove($('jigsaw-button'));
            await waitForPresence('jigsaw-tooltip-dialog');
            expectToExist('jigsaw-tooltip-dialog');
        });
        it('shoud be accept when mouse click', async () => {
            await browser.get('/tooltip/in-dom');
            expect($('jigsaw-tooltip-dialog .tooltip-content h3').getText()).toBe('This is a message!');
            $('jigsaw-tooltip-dialog a').click();
            await expectStringFromAlert('I got it!');
        });
        it('shoud be edit', async () => {
            await browser.get('/tooltip/inline');
            const input = $('input');
            mouseMove($('jigsaw-button'));
            await waitForPresence('jigsaw-tooltip-dialog');
            expectToExist('jigsaw-tooltip-dialog');
            mouseMove(input);
            $('.jigsaw-input-icon-end').click();
            input.click();
            input.clear();
            input.sendKeys('123321');
            mouseMove($('jigsaw-button'));
            await waitForPresence('jigsaw-tooltip-dialog');
            expect($('jigsaw-tooltip-dialog').getText()).toBe('123321');
        });
    })
});
