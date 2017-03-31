import {Component} from '@angular/core';

import {PopupService, IPopupable} from '../../../../../../core/service/popup.service';

@Component({
    templateUrl: 'use-tooltip.html',
    styleUrls: ['use-tooltip.scss']
})
export class UseTooltipComponent implements IPopupable {

    private _initDate: any;

    public popupId: number;

    public get initDate() {
        return this._initDate
    }

    public set initData(newValue: any) {
        this._initDate = newValue;
    }

    constructor(private _popupService: PopupService) {
    }

    close() {
        this._popupService.removePopup(this.popupId);
    }

}

