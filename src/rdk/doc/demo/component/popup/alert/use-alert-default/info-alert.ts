import {Component} from '@angular/core';

import {PopupService, ButtonInfo} from '../../../../../../service/popup.service';
import { AlertLevel } from '../../../../../../component/alert/alert';
import {IDialog} from "../../../../../../component/dialog/dialog";

@Component({
    templateUrl: 'info-alert.html',
    styles: [`
        label{
            padding:16px 0 0 0 !important;
        }
    `]
})
export class InfoAlert implements IDialog {

    private _initDate: any;
    public level: AlertLevel = AlertLevel.info;
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

