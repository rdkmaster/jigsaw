import {Component} from "@angular/core";
import {ButtonInfo} from "jigsaw/service/popup.service";

@Component({
    templateUrl: './app.component.html',
    styles: [`.fa {
        margin-right: 5px
    }`]
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

