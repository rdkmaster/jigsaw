import {Component} from '@angular/core';

import {PopupService, IDialog, ButtonInfo} from '../../../../../../service/popup.service';
import { AlertLevel } from '../../../../../../component/alert/alert';

@Component({
    templateUrl: 'error-alert.html',
    styles: [`
        label{
            padding:16px 0px 0px 0px!important;
        }
    `]
})
export class ErrorAlert implements IDialog {

    private _initDate: any;
    public level: AlertLevel = AlertLevel.error;
    public popupId: number;
    public get initDate() {
        return this._initDate
    }

    public set initData(newValue: any) {
        this._initDate = newValue;
    }

    public title: string;
    public buttons: Array<ButtonInfo> = [

    ];

    constructor(private _popupService: PopupService) {
    }

    close() {
        this._popupService.removePopup(this.popupId);
    }

}

