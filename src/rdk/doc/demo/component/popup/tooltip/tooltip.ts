import {Component, ViewChild, ElementRef} from "@angular/core";

import {UseTooltipComponent} from './use-tooltip/use-tooltip';

import {
    PopupService, PopupOptions, PopupPositionType
} from '../../../../../service/popup.service';

@Component({
    templateUrl: 'tooltip.html'
})
export class TooltipDemoComponent {
    private _popupId: number;

    @ViewChild("insertPlace", {read: ElementRef}) insertPlaceEl: ElementRef;

    constructor(private _popupService: PopupService) {
    }

    popup() {
        this._popupId = this._popupService.popup(UseTooltipComponent, this._getTooltipOptions(this.insertPlaceEl));
    }

    close() {
        this._popupService.removePopup(this._popupId);
    }

    private _getTooltipOptions(insertPlaceEl: ElementRef): PopupOptions {
        return {
            modal: false, //是否模态
            pos: insertPlaceEl, //插入点
            posOffset: { //偏移位置
                bottom: -8,
                left: 0
            },
            posType: PopupPositionType.absolute, //定位类型
        };
    }

}

