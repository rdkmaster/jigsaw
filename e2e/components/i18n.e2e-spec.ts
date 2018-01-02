import {$$, $,browser} from "protractor";

describe('i18n', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test i18n full', () => {
        beforeEach(() => {
            browser.get('/i18n/full');
        });
        it('should be International', async () => {
            const buttons = $$('jigsaw-button'),
                alertContent = $('jigsaw-alert').$('.jigsaw-alert-content'),
                dialogContent = $('jigsaw-dialog').$('.dialog-content'),
                rangeSwitch = $('jigsaw-range-time').$('.picker-switch'),
                timeSwitch = $('jigsaw-time').$('.picker-switch');
            const enMonth =['January','February','March','April','May','June','July','August','September','October','November','December'],
                cnMonth = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
            let now = new Date();
            buttons.get(0).click();
            expect(alertContent.getText()).toBe('This is a great info alert!');
            expect(dialogContent.getText()).toBe('Create task success');
            expect(rangeSwitch.getText()).toBe(enMonth[now.getMonth()]+' '+now.getFullYear());
            expect(timeSwitch.getText()).toBe(enMonth[now.getMonth()]+' '+now.getFullYear());
            buttons.get(1).click();
            expect(alertContent.getText()).toBe('这是一个非常棒的 info 提示框！');
            expect(dialogContent.getText()).toBe('创建任务成功');
            expect(rangeSwitch.getText()).toBe(cnMonth[now.getMonth()]+' '+now.getFullYear());
            expect(timeSwitch.getText()).toBe(cnMonth[now.getMonth()]+' '+now.getFullYear());
        })
    })
});
