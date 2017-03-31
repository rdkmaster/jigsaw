import {Component} from '@angular/core';

import {PopupService, IDialog, ButtonOptions} from '../../../../../../service/popup.service';

@Component({
    templateUrl: 'use-dialog.html',
    styleUrls: ['use-dialog.scss']
})
export class UseDialogComponent implements IDialog {

    private _initDate: any;

    public popupId: number;

    public get initDate() {
        return this._initDate
    }

    public set initData(newValue: any) {
        this._initDate = newValue;
    }

    public title: string = `Title of the dialog`;
    public buttons: Array<ButtonOptions> = [
        {
            label: 'confirm', callback: () => {
                console.log('confirm callback success!')
            }
        },
        {
            label: 'cancel', callback: () => {
                this.close();
            }
        }
    ];

    constructor(private _popupService: PopupService) {
    }

    close() {
        this._popupService.removePopup(this.popupId);
    }

}

