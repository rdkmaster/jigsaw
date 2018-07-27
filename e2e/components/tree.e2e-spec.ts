import {browser, $, $$} from 'protractor';
import {waitForInvisibility, waitForVisibility} from "../utils/index";
import {expectToExist} from "../utils/asserts";
import {mouseMove, pressKeys} from "../utils/actions";
import {waitForNotPresence, waitForPresence} from "../utils/await";


describe('tree', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test tree basic', () => {
        beforeEach(() => {
            browser.get('/tree/basic');
        });
        it('should be switch either click or double click and father node should be selected when all childern was selected and in turn the same', async () => {
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
            $('#__unique_id__1_1_check').click();
            await waitForPresence('#__unique_id__1_1 > .checkbox_true_full_focus');
            expectToExist($('#__unique_id__1_1 > .checkbox_true_full_focus'));
        });
    });
    describe('test tree editable', () => {
        beforeEach(() => {
            browser.get('/tree/editable');
        });
        it('should be editable and deleted', async () => {
            await waitForPresence('#__unique_id__1_1_a');

            const firstNode = $('#__unique_id__1_1_a');

            // 修改第一个节点名
            mouseMove(firstNode);
            $('#__unique_id__1_1_edit').click();
            await waitForPresence('#__unique_id__1_1_span input');
            pressKeys('-修改后');
            $('body').click();
            await waitForNotPresence('#__unique_id__1_1_span input');
            expect(firstNode.$('#__unique_id__1_1_span').getText()).toBe('北京市-修改后');

            // 删除第一个节点里的第一个子节点
            browser.actions().doubleClick(firstNode).perform();
            await waitForPresence('#__unique_id__1_2_a');
            const firstChildNode = $('#__unique_id__1_2_a');
            firstChildNode.click();
            await waitForPresence('#__unique_id__1_2_remove');
            firstChildNode.$('#__unique_id__1_2_remove').click();
            expectToExist(firstChildNode, false);
        });
    })
});
