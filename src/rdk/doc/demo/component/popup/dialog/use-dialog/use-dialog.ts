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
            label: 'confirm',
            callback: () => {
                console.log('confirm callback success!')
            },
            clazz: ""
        },
        {
            label: 'cancel',
            callback: this.dispose,
            callbackContext: this,
            clazz: ""
        }
    ];
}

