import {Component, ComponentRef, Renderer2, ViewContainerRef} from "@angular/core";
import {
    ButtonInfo, PopupEffect, PopupInfo, PopupOptions, PopupPositionType,
    PopupService
} from "jigsaw/service/popup.service";
import {JigsawConfirmAlert, JigsawErrorAlert, JigsawInfoAlert, JigsawWarningAlert} from "jigsaw/component/alert/alert";

@Component({
    template: `
        <jigsaw-button width="175" (click)="commonInfoAlert()">
            通用信息提示框
        </jigsaw-button>
    
        <jigsaw-button width="175" (click)="commonWarningAlert()">
            通用警告提示框
        </jigsaw-button>
    
        <jigsaw-button width="175" (click)="commonErrorAlert($event)">
            通用错误提示框
        </jigsaw-button>
    
        <jigsaw-button width="175" (click)="commonConfirmAlert($event)">
            通用确认提示框
        </jigsaw-button>
    
        <p style="margin-top: 20px; font-size: 16px">{{answer}}</p>
    `
})
export class AlertPopupDemoComponent {

    answer = '';

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2,
                private _popupService: PopupService) {
    }

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
        let p = JigsawErrorAlert.show('this is a great warning alert!', answer => {
            this.answer = answer ? 'great! your answer is: ' + answer.label : 'you closed the alert with the close button';
        }, null, null, false);
    }

    commonConfirmAlert() {
        this.answer = 'waiting for an answer';
        let p = JigsawConfirmAlert.show('Jigsaw is great, do you agree?', answer => {
                this.answer = answer ? 'great! your answer is: ' + answer.label : 'you closed the alert with the close button';
            },
            /* custom your own buttons*/
            [{label: 'alert.button.yes'}, {label: 'alert.button.no'}, {label: "不知道"}]);
    }
}

