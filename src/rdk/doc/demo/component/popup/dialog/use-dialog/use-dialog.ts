import {Component, ViewChild} from "@angular/core";

import {ButtonInfo} from "../../../../../../service/popup.service";
import {DialogBase, RdkDialog} from "../../../../../../component/dialog/dialog";

@Component({
    templateUrl: 'use-dialog.html',
    styleUrls: ['use-dialog.scss']
})
export class UseDialogComponent extends DialogBase {
    @ViewChild(RdkDialog) public dialog:RdkDialog;

    public title: string = 'Title of the dialog';
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

