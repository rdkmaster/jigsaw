import {Component, ViewChild} from '@angular/core';

import {PopupService, IPopupable, PopupOptions} from '../../../../../../service/popup.service';
import {RdkTooltip} from "../../../../../../component/tooltip/tooltip";

@Component({
    templateUrl: 'use-tooltip.html',
    styleUrls: ['use-tooltip.scss']
})
export class UseTooltipComponent implements IPopupable {
    disposer: () => void;
    options: PopupOptions;

    private _initDate: any;

    public popupId: number;

    public get initDate() {
        return this._initDate
    }

    public set initData(newValue: any) {
        this._initDate = newValue;
    }

    @ViewChild(RdkTooltip) public tooltip: RdkTooltip;

    constructor(private _popupService: PopupService) {
    }

    close() {
        this.tooltip.close();
    }

}

