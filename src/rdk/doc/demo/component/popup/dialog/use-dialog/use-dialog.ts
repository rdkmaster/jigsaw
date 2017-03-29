import {Component} from '@angular/core';

import {PopupService, IDialog, PopupOptions} from '../../../../../../core/service/popup.service';

@Component({
    templateUrl: 'use-dialog.html',
    styleUrls: ['use-dialog.scss']
})
export class UseDialogComponent implements IDialog {

    private _initDate: any;

    public id: number;

    public get initDate() {
        return this._initDate
    }

    public set initData(newValue: any) {
        this._initDate = newValue;
        this.test = newValue.test;
    }

    public title: string = `Title of the dialog`;
    public options: PopupOptions;
    public buttons: any[] = [
        {
            label: 'confirm', callback: () => {
            console.log('confirm callback success!')
        }
        },
        {
            label: 'cancle', callback: () => {
                this.close();
            }
        }
    ];

    constructor(private _popupService: PopupService) {
    }

    close() {
        this._popupService.close(this.id);
    }

    test: () => void;
}

