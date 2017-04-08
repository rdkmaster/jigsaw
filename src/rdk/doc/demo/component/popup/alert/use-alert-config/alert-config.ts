import {Component, ViewEncapsulation} from '@angular/core';

import {PopupService, ButtonInfo} from '../../../../../../service/popup.service';
import {AlertLevel} from '../../../../../../component/alert/alert';
import {IDialog} from "../../../../../../component/dialog/dialog";

@Component({
    templateUrl: 'alert-config.html',
    styleUrls: ['alert-config.scss'],
    encapsulation: ViewEncapsulation.None
})
//todo encapsulation属性为了覆盖原来控件的样式属性，如有需要请添加自己的演示到buttons的class属性里面。
export class UserAlertComponentConfig implements IDialog {

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
    public buttons: ButtonInfo[] = [

        {
            label: 'ok',
            callback: () => {
                console.log('ok callback success!');
                this.close();
            },
            clazz: 'button-ok'
        },
        {
            label: 'cancel',
            callback: () => {
                console.log('cancel callback success!');
                this.close();
            },
            clazz: 'button-cancel'

        }
    ];

    constructor(private _popupService: PopupService) {
    }

    afterClose(message: any) {
        console.log("after close...");
    }

    close() {
        this._popupService.removePopup(this.popupId);
    }

}

