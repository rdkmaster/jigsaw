import {Component, ViewChild, ElementRef, ComponentRef} from "@angular/core";

import {UseTooltipComponent} from './use-tooltip/use-tooltip';

import {
    PopupService, PopupOptions, PopupPositionType, PopupRef, IPopupable
} from '../../../../../service/popup.service';

@Component({
    templateUrl: 'tooltip.html'
})
export class TooltipDemoComponent {
    private _tooltipRef: PopupRef;

    @ViewChild("insertPlace", {read: ElementRef}) insertPlaceEl: ElementRef;

    constructor(private _popupService: PopupService) {
    }

    popup() {
        this._tooltipRef = this._popupService.popup(UseTooltipComponent, this._getTooltipOptions(this.insertPlaceEl));
    }

    close() {
        this._tooltipRef.destroy();
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

