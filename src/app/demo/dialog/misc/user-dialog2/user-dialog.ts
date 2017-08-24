import {Component, ViewChild} from "@angular/core";
import {DialogBase, JigsawDialog} from "jigsaw/component/dialog/dialog";
import {ButtonInfo} from "jigsaw/service/popup.service";


@Component({
    templateUrl: 'user-dialog.html',
    styleUrls: ['user-dialog.scss']
})
export class UserDialog2Component extends DialogBase {
    @ViewChild(JigsawDialog) dialog: JigsawDialog;

    public caption: string = `Title of the dialog`;
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

