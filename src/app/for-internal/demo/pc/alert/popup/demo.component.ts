import {Component} from "@angular/core";
import {JigsawConfirmAlert, JigsawErrorAlert, JigsawInfoAlert, JigsawWarningAlert} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class AlertPopupDemoComponent {
    header = '这是一个标题';
    message = '弹出的信息也可以直接给一个字符串，Alert会将此字符串作为主消息显示出来。';
    answer = '';

    createLongText() {
        this.message = 'This is very long regular text in English. This is very long regular text in English. This is very long abnormall texxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxt in English. 这是一长串数字123456789012345678901234567890123456789012345678901234567890';
    }

    /**
     * 采用Promise方式来处理对话框，推荐。
     */
    async commonInfoAlert() {
        this.answer = 'waiting for an answer';
        const info = {header: this.header, message: this.message};
        const answer = await JigsawInfoAlert.show(info).toPromise();
        this.answer = answer ? 'great! your answer is: ' + answer.label : 'you closed the alert with the close button';
    }

    /**
     * 采用Promise方式来处理对话框，推荐。
     */
    async commonWarningAlert() {
        this.answer = 'waiting for an answer';
        const info = {header: this.header, message: this.message};
        const answer = await JigsawWarningAlert.show(info).toPromise();
        this.answer = answer ? 'great! your answer is: ' + answer.label : 'you closed the alert with the close button';
    }

    /**
     * 采用Promise方式来处理对话框，推荐。
     */
    async commonErrorAlert() {
        this.answer = 'waiting for an answer';
        const info = {header: this.header, message: this.message};
        const answer = await JigsawErrorAlert.show(info).toPromise();
        this.answer = answer ? 'great! your answer is: ' + answer.label : 'you closed the alert with the close button';
    }

    /**
     * 采用Promise方式来处理对话框，推荐。
     */
    async commonConfirmAlert() {
        this.answer = 'waiting for an answer';
        const info = { header: this.header, message: this.message };
        const buttons = [{ label: 'alert.button.yes' }, { label: 'alert.button.no' }, { label: "不知道" }];
        const answer = await JigsawConfirmAlert.show(info, buttons).toPromise();
        this.answer = answer ? 'great! your answer is: ' + answer.label : 'you closed the alert with the close button';
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何弹出一个Alert组件';
    description: string = '';
}
