import {browser, $, $$} from 'protractor';
import {waitForInvisibility, waitForVisibility} from "../utils/index";
import {expectToExist} from "../utils/asserts";
import {mouseMove} from "../utils/actions";
import {waitForPresence} from "../utils/await";


describe('tree', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test tree basic', () => {
        beforeEach(() => {
            browser.get('/tree/basic');
        });
        it('should be switch either click or double click', async () => {
            expect($('#__unique_id__1_1_ul').getCssValue('display')).toBe('block');
            browser.actions().doubleClick($('#__unique_id__1_1_span')).perform();
            await waitForInvisibility('#__unique_id__1_1_ul');
            expect($('#__unique_id__1_1_ul').getCssValue('display')).toBe('none');
            $('#__unique_id__1_1_switch').click();
            await waitForVisibility('#__unique_id__1_1_ul');
            expect($('#__unique_id__1_1_ul').getCssValue('display')).toBe('block');
            $('#__unique_id__1_2_switch').click();
            await waitForVisibility('#__unique_id__1_2_ul');
            browser.actions().doubleClick($('#__unique_id__1_2_span')).perform();
            await waitForInvisibility('#__unique_id__1_2_ul');
        });
        it('father node should be selected when all childern was selected and in turn the same', () => {
            $('#__unique_id__1_1_check').click();
            expectToExist($('#__unique_id__1_1 > .checkbox_true_full'));
        });
    });
    describe('test tree editable', () => {
        it('should be editable and deleted', async () => {
            await browser.get('/tree/editable');
            await waitForPresence('#__unique_id__1_1_a');
            mouseMove($('#__unique_id__1_1_a'));
            $('#__unique_id__1_1_edit').click();
            await waitForPresence('.curSelectedNode_Edit');
            mouseMove($('#__unique_id__1_2_span'));
            $('#__unique_id__1_2_remove').click();
            expectToExist($('#__unique_id__1_2_span'), false);
        });
    })
});
