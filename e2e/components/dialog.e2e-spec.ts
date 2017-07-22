import {browser, element, by, ExpectedConditions} from 'protractor';
import {
    expectClosePopup, expectPopupAtPoint, expectPopupBlock, expectPopupByModal
} from "../utils/popup";
import {expectToExist} from "../utils/asserts";

describe('dialog', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test dialog popup', () => {
        beforeEach(() => {
            browser.get('dialog/misc');
        });

        it('should popup a custom dialog as modal when click the button', async () => {
            expectToExist(element(by.tagName('jigsaw-block')), false);
            expectToExist(element(by.tagName('jigsaw-dialog')), false);

            const trigger1 = element(by.id('trigger1'));
            trigger1.click();

            await browser.wait(ExpectedConditions.presenceOf(element(by.css('.jigsaw-dialog'))));

            await expectPopupBlock('jigsaw-block');

            await expectPopupByModal('jigsaw-dialog', 0.2);

            await expectClosePopup('jigsaw-dialog', 'jigsaw-block');
        });

        it('should popup a custom dialog at point when click the button', async () => {
            expect(element(by.tagName('jigsaw-block')).isPresent()).toBe(false, 'not popup block');
            expect(element(by.tagName('jigsaw-dialog')).isPresent()).toBe(false, 'not popup dialog');

            const trigger2 = element(by.id('trigger2'));
            browser.actions().mouseMove(trigger2, {x: 100, y: 10}).click().perform();

            browser.sleep(350);

            expect(element(by.tagName('jigsaw-block')).isPresent()).toBe(false);

            await expectPopupAtPoint(trigger2, 'jigsaw-dialog', {x: 100, y: 10}, {x: 10, y: -10});

            await expectClosePopup('jigsaw-dialog', 'jigsaw-block');
        });

        it('should popup a template dialog as modal when click the button', async () => {
            expect(element(by.tagName('jigsaw-block')).isPresent()).toBe(false);
            expect(element(by.tagName('jigsaw-dialog')).isPresent()).toBe(false);

            const trigger3 = element(by.id('trigger3'));
            trigger3.click();

            browser.sleep(350);

            await expectPopupBlock('jigsaw-block');

            await expectPopupByModal('jigsaw-dialog');

            await expectClosePopup('jigsaw-dialog', 'jigsaw-block');
        });

        it('should popup a template dialog at point when click the button', async () => {
            expect(element(by.tagName('jigsaw-block')).isPresent()).toBe(false);
            expect(element(by.tagName('jigsaw-dialog')).isPresent()).toBe(false);

            const trigger4 = element(by.id('trigger4'));
            browser.actions().mouseMove(trigger4, {x: 100, y: 10}).click().perform();

            browser.sleep(350);

            expect(element(by.tagName('jigsaw-block')).isPresent()).toBe(false);

            await expectPopupAtPoint(trigger4, 'jigsaw-dialog', {x: 100, y: 10}, {x: 10, y: -10});

            await expectClosePopup('jigsaw-dialog', 'jigsaw-block');
        });

    })
});


