import {$$, $,browser} from "protractor";

describe('i18n', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test i18n full', () => {
        it('should be International', async () => {
            await browser.get('/i18n/full');
            const buttons = $$('jigsaw-button'),
                alertContent = $('jigsaw-alert').$('.jigsaw-alert-content'),
                dialogContent = $('jigsaw-dialog').$('.dialog-content'),
                rangeSwitch = $('jigsaw-range-time').$('.picker-switch'),
                timeSwitch = $('jigsaw-time').$('.picker-switch');
            buttons.get(0).click();
            expect(alertContent.getText()).toBe('This is a great info alert!');
            expect(dialogContent.getText()).toBe('Create task success');
            expect(rangeSwitch.getText()).toBe('December 2017');
            expect(timeSwitch.getText()).toBe('December 2017');
            buttons.get(1).click();
            expect(alertContent.getText()).toBe('这是一个非常棒的 info 提示框！');
            expect(dialogContent.getText()).toBe('创建任务成功');
            expect(rangeSwitch.getText()).toBe('十二月 2017');
            expect(timeSwitch.getText()).toBe('十二月 2017');
        })
    })
});
