import {Component} from "@angular/core";
import {
    JigsawConfirmAlert, JigsawErrorAlert, JigsawInfoAlert,
    JigsawWarningAlert
} from "jigsaw/component/alert/alert";

@Component({
    template: `
        <jigsaw-button width="175" (click)="commonInfoAlert()">
            通用信息提示框
        </jigsaw-button>
    
        <jigsaw-button width="175" (click)="commonWarningAlert()">
            通用警告提示框
        </jigsaw-button>
    
        <jigsaw-button width="175" (click)="commonErrorAlert()">
            通用错误提示框
        </jigsaw-button>
    
        <jigsaw-button width="175" (click)="commonConfirmAlert()">
            通用确认提示框
        </jigsaw-button>
    
        <p style="margin-top: 20px; font-size: 16px">{{answer}}</p>
    `
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
}

