import {Component, ViewChild} from "@angular/core";

import {ButtonInfo} from "jigsaw/service/popup.service";
import {DialogBase, JigsawDialog} from "jigsaw/component/dialog/dialog";

@Component({
    templateUrl: 'alert-info.html',
    styleUrls: ['alert-info.scss']
})
export class SoftBankAlertInfoComponent extends DialogBase {
    @ViewChild(JigsawDialog) public dialog:JigsawDialog;

    public buttons: Array<ButtonInfo> = [
        {
            role: 'cancel',
            label: 'cancel',
            clazz: ''
        },
        {
            role: 'confirm',
            label: 'confirm',
            clazz: '',
            type: 'primary'
        },
    ];
}

