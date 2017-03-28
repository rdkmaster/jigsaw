import {Component, ElementRef, Renderer2} from '@angular/core';

import {PopupService, IPopupable} from '../../../../../../core/service/popup.service';

@Component({
    templateUrl: 'use-dialog.html',
    styleUrls: ['use-dialog.scss']
})
export class UseDialogComponent implements IPopupable{
    private _initDate: any;

    public get initDate(){return this._initDate}
    public set initData(newValue: any){
        this._initDate = newValue;
        this.test = newValue.test;
    }
    public renderer: Renderer2;
    public el: ElementRef;

    private _dialogTitle: string = 'Title of the dialog';

    constructor(private _popupService: PopupService){
    }

    test: () => void;
}

