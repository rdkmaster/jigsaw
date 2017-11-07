import {Component} from "@angular/core";
import {ButtonInfo} from "jigsaw/service/popup.service";
import {DemoBase} from "app/demo-description/demo-base";

@Component({
    templateUrl: './app.component.html',
    styles: [`.fa {
        margin-right: 5px
    }`]
})
export class DialogInDomDemoComponent extends DemoBase {
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

