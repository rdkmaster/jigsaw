import {Component} from "@angular/core";
import {
    JigsawConfirmAlert, JigsawErrorAlert, JigsawInfoAlert,
    JigsawWarningAlert
} from "jigsaw/component/alert/alert";

@Component({
    templateUrl: './demo.component.html'
})
export class AlertPopupDemoComponent {

    answer = '';

    commonInfoAlert() {
        this.answer = 'waiting for an answer';
        JigsawInfoAlert.show('this is a great info alert!', answer => {
            this.answer = answer ? 'great! your answer is: ' + answer.label : 'you closed the alert with the close button';
        });
    }

    commonWarningAlert() {
        this.answer = 'waiting for an answer';
        JigsawWarningAlert.show('this is a great warning alert!', answer => {
            this.answer = answer ? 'great! your answer is: ' + answer.label : 'you closed the alert with the close button';
        });
    }

    commonErrorAlert() {
        this.answer = 'waiting for an answer';
        JigsawErrorAlert.show('this is a great error alert!', answer => {
            this.answer = answer ? 'great! your answer is: ' + answer.label : 'you closed the alert with the close button';
        }, null, null, false);
    }

    commonConfirmAlert() {
        this.answer = 'waiting for an answer';
        JigsawConfirmAlert.show('Jigsaw is great, do you agree?', answer => {
                this.answer = answer ? 'great! your answer is: ' + answer.label : 'you closed the alert with the close button';
            },
            /* custom your own buttons*/
            [{label: 'alert.button.yes'}, {label: 'alert.button.no'}, {label: "不知道"}]);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何弹出一个Alert组件';
    description: string = '';
    tags: string[] = [
        'JigsawInfoAlert.show', 'JigsawWarningAlert.show',
        'JigsawErrorAlert.show', 'JigsawConfirmAlert.show'
    ];
}

