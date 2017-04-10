import {Component, ViewChild} from '@angular/core';

import {PopupService, ButtonInfo} from '../../../../../../service/popup.service';
import {DialogBase, IDialog, RdkDialog} from "../../../../../../component/dialog/dialog";

@Component({
    templateUrl: 'use-dialog.html',
    styleUrls: ['use-dialog.scss']
})
export class UseDialog2Component extends DialogBase {
    @ViewChild(RdkDialog) dialog: RdkDialog;

    public title: string = `Title of the dialog`;
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
            callback: () => {
                this.dispose();
            },
            clazz: ""
        }
    ];

}

