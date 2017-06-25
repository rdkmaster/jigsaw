import {Component, ViewChild} from "@angular/core";

import {ButtonInfo} from "../../../../../rdk/service/popup.service";
import {DialogBase, RdkDialog} from "../../../../../rdk/component/dialog/dialog";

@Component({
    templateUrl: 'user-dialog.html',
    styleUrls: ['user-dialog.scss']
})
export class UserDialogComponent extends DialogBase {
    @ViewChild(RdkDialog) public dialog:RdkDialog;

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

