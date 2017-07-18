import {browser, element, by, ExpectedConditions} from 'protractor';
import {
    expectClosePopup, expectPopupAtPoint, expectPopupBlock, expectPopupByModal
} from "../utils/popup";

describe('dialog', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test dialog popup', () => {
        beforeEach(() => {
            browser.get('dialog/misc');
        });

        it('should popup a custom dialog as modal when click the button', async () => {
            let popupBlock = element(by.tagName('jigsaw-block'));
            let popupDialog = element(by.tagName('jigsaw-dialog'));
            expect(popupBlock.isPresent()).toBe(false);
            expect(popupDialog.isPresent()).toBe(false);

            const trigger1 = element(by.id('trigger1'));
            trigger1.click();

            await expectPopupBlock(popupBlock);

            await expectPopupByModal(popupDialog, 0.2);

            await expectClosePopup(popupDialog, popupBlock);
        });

        it('should popup a custom dialog at point when click the button', async () => {
            let popupBlock = element(by.tagName('jigsaw-block'));
            let popupDialog = element(by.tagName('jigsaw-dialog'));
            expect(popupBlock.isPresent()).toBe(false);
            expect(popupDialog.isPresent()).toBe(false);

            const trigger2 = element(by.id('trigger2'));
            browser.actions().mouseMove(trigger2, {x: 100, y: 10}).click().perform();

            expect(popupBlock.isPresent()).toBe(false);

            await expectPopupAtPoint(trigger2, popupDialog, {x: 100, y: 10}, {x: 10, y: -10});

            await expectClosePopup(popupDialog, popupBlock);
        });

        it('should popup a template dialog as modal when click the button', async () => {
            let popupBlock = element(by.tagName('jigsaw-block'));
            let popupDialog = element(by.tagName('jigsaw-dialog'));
            expect(popupBlock.isPresent()).toBe(false);
            expect(popupDialog.isPresent()).toBe(false);

            const trigger3 = element(by.id('trigger3'));
            trigger3.click();

            await expectPopupBlock(popupBlock);

            await expectPopupByModal(popupDialog);

            await expectClosePopup(popupDialog, popupBlock);
        });

        it('should popup a template dialog at point when click the button', async () => {
            let popupBlock = element(by.tagName('jigsaw-block'));
            let popupDialog = element(by.tagName('jigsaw-dialog'));
            expect(popupBlock.isPresent()).toBe(false);
            expect(popupDialog.isPresent()).toBe(false);

            const trigger4 = element(by.id('trigger4'));
            browser.actions().mouseMove(trigger4, {x: 100, y: 10}).click().perform();

            expect(popupBlock.isPresent()).toBe(false);

            await expectPopupAtPoint(trigger4, popupDialog, {x: 100, y: 10}, {x: 10, y: -10});

            await expectClosePopup(popupDialog, popupBlock);
        });

    })
});


