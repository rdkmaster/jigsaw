import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {ButtonInfo} from "jigsaw/service/popup.service";

@Component({
    template: `
        <jigsaw-dialog width="300px" [buttons]="buttons">
            <div jigsaw-title>
                <span class="fa fa-thumbs-up"></span>Title of the dialog
            </div>
            <div jigsaw-body>
                <ul class="dialog-content">
                    <li>Dialog content...</li>
                    <li>Dialog content...</li>
                    <li>Dialog content...</li>
                </ul>
            </div>
        </jigsaw-dialog>
    `
})
export class DialogInDomDemoComponent {
    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2) {
    }
    public buttons: Array<ButtonInfo> = [
        {
            role: 'confirm',
            label: 'confirm',
            clazz: ""
        },
        {
            role: 'cancel',
            label: 'cancel',
            clazz: ""
        }
    ];
}

