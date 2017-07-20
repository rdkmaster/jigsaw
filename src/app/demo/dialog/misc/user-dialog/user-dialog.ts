import {Component, ViewChild} from "@angular/core";

import {ButtonInfo} from "jigsaw/service/popup.service";
import {DialogBase, JigsawDialog} from "jigsaw/component/dialog/dialog";

@Component({
    templateUrl: 'user-dialog.html',
    styleUrls: ['user-dialog.scss']
})
export class UserDialogComponent extends DialogBase {
    @ViewChild(JigsawDialog) public dialog:JigsawDialog;

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

