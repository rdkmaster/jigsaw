import {Component, ViewChild, ElementRef} from "@angular/core";

import {UseTooltipComponent} from './use-tooltip/use-tooltip';

import {
    PopupService, PopupEffect, PopupOptions, PopupPositionType
} from '../../../../../core/service/popup.service';

@Component({
    templateUrl: 'tooltip.html'
})
export class TooltipDemoComponent {
    private _componentId: number;

    @ViewChild("insertPlace", {read: ElementRef}) insertPlaceEl: ElementRef;

    constructor(private _popupService: PopupService) {
    }

    popup() {
        this._componentId = this._popupService.popup(UseTooltipComponent, this._getTooltipOptions(this.insertPlaceEl));
    }

    close() {
        this._popupService.close(this._componentId);
    }

    private _getTooltipOptions(insertPlaceEl: ElementRef): PopupOptions {
        return {
            modal: false, //是否模态
            showEffect: PopupEffect.fadeIn,//弹出的动效，fadeIn/fadeOut，wipeIn/wipeOut
            hideEffect: PopupEffect.fadeOut, //隐藏的动效，fadeIn/fadeOut，wipeIn/wipeOut
            pos: insertPlaceEl,
            posOffset: {
                top: -14,
                left: 0
            },
            posType: PopupPositionType.absolute,
        };
    }

}

