import {Component, ViewChild} from "@angular/core";
import {DialogBase, JigsawDialog} from "jigsaw/component/dialog/dialog";
import {ButtonInfo} from "jigsaw/service/popup.service";


@Component({
    templateUrl: 'alert-warning.html',
    styleUrls: ['alert-warning.scss']
})
export class SoftBankAlertWarningComponent extends DialogBase {
    @ViewChild(JigsawDialog) dialog: JigsawDialog;

    public title: string = `Title of the dialog`;
    public buttons: Array<ButtonInfo> = [
        {
            role: 'cancel',
            label: 'cancel',
            clazz: ''
        },
        {
            role: 'edit',
            label: 'edit',
            clazz: '',
            type: 'warning'
        },
    ];

}

