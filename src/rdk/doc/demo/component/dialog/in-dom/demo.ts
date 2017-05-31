import {Component} from "@angular/core";
import {ButtonInfo} from "../../../../../service/popup.service";

@Component({
    template: `
        <rdk-dialog width="300px" [buttons]="buttons">
            <div rdk-title>
                <span class="fa fa-thumbs-up"></span>Title of the dialog
            </div>
            <div rdk-body>
                <ul class="dialog-content">
                    <li>Dialog content...</li>
                    <li>Dialog content...</li>
                    <li>Dialog content...</li>
                </ul>
            </div>
        </rdk-dialog>
    `
})
export class DialogInDomDemoComponent {
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

