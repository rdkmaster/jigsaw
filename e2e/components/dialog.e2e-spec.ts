import {browser, element, by} from 'protractor';
import {
    expectClosePopup, expectPopupAtPoint, expectPopupBlock, expectPopupByModal
} from "../utils/popup";
import {expectToExist, waitForPresence} from "../utils/index";
import {expectStringFromAlert} from "../utils/asserts";
import {waitForNotPresence} from "../utils/await";

describe('dialog', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test dialog popup', () => {
        beforeEach(() => {
            browser.get('/dialog/misc');
        });

        xit('should popup a custom dialog as modal when click the button', async () => {
            expectToExist('jigsaw-block', false);
            expectToExist('jigsaw-dialog', false);

            const trigger1 = element(by.id('trigger1'));
            trigger1.click();

            await waitForPresence('.jigsaw-dialog');

            await expectPopupBlock('jigsaw-block');

            await expectPopupByModal('jigsaw-dialog', 0.2);

            await expectClosePopup('jigsaw-dialog', 'jigsaw-block');
        });

        it('should popup a custom dialog at point when click the button', async () => {
            expectToExist('jigsaw-block', false);
            expectToExist('jigsaw-dialog', false);

            const trigger2 = element(by.id('trigger2'));
            browser.actions().mouseMove(trigger2, {x: 100, y: 10}).click().perform();

            await waitForPresence('.jigsaw-dialog');

            expectToExist('jigsaw-block', false);

            await expectPopupAtPoint(trigger2, 'jigsaw-dialog', {x: 100, y: 10}, {x: 10, y: -10});

            await expectClosePopup('jigsaw-dialog', 'jigsaw-block');
        });

        xit('should popup a template dialog as modal when click the button', async () => {
            expectToExist('jigsaw-block', false);
            expectToExist('jigsaw-dialog', false);

            const trigger3 = element(by.id('trigger3'));
            trigger3.click();

            await waitForPresence('.jigsaw-dialog');

            await expectPopupBlock('jigsaw-block');

            await expectPopupByModal('jigsaw-dialog');

            await expectClosePopup('jigsaw-dialog', 'jigsaw-block');
        });

        it('should popup a template dialog at point when click the button', async () => {
            expectToExist('jigsaw-block', false);
            expectToExist('jigsaw-dialog', false);

            const trigger4 = element(by.id('trigger4'));
            browser.actions().mouseMove(trigger4, {x: 100, y: 10}).click().perform();

            await waitForPresence('.jigsaw-dialog');

            expectToExist('jigsaw-block', false);

            await expectPopupAtPoint(trigger4, 'jigsaw-dialog', {x: 100, y: 10}, {x: 10, y: -10});

            element(by.css('.jigsaw-dialog')).element(by.css('.jigsaw-popup-close')).click();

            await expectStringFromAlert('The dialog leave no message!');

            await waitForNotPresence('.jigsaw-dialog');

            await expect(element(by.css('.jigsaw-dialog')).isPresent()).toBe(false);
        });

    });

    describe('test dialog in dom', () => {
        it('should test basic functions of dialog', async () => {
            await browser.get('/dialog/in-dom');
            const okButton = element.all(by.tagName('jigsaw-button')).get(0),
                cancelButton = element.all(by.tagName('jigsaw-button')).get(1);
            okButton.click();
            await expectStringFromAlert('Button "OK" clicked!');
            cancelButton.click();
            await expectStringFromAlert('Button "Cancel" clicked!');
        })
    })
});


