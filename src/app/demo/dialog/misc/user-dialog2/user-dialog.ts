import {Component, ViewChild} from "@angular/core";
import {DialogBase, RdkDialog} from "../../../../../rdk/component/dialog/dialog";
import {ButtonInfo} from "../../../../../rdk/service/popup.service";


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

