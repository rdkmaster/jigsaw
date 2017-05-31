import {Component, ViewChild} from "@angular/core";

import {ButtonInfo} from "../../../../../../service/popup.service";
import {DialogBase, RdkDialog} from "../../../../../../component/dialog/dialog";

@Component({
    templateUrl: 'user-dialog.html',
    styleUrls: ['user-dialog.scss']
})
export class UserDialog2Component extends DialogBase {
    @ViewChild(RdkDialog) dialog: RdkDialog;

    public title: string = `Title of the dialog`;
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

