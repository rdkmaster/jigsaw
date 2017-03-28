import {Component, ViewChild, ElementRef} from "@angular/core";

import {RdkTooltip} from '../../../../../component/tooltip/tooltip';

import {
    PopupService, PopupEffect, PopupOptions, PopupPositionType
} from '../../../../../core/service/popup.service';

@Component({
    templateUrl: 'tooltip.html'
})
export class TooltipDemoComponent {
    @ViewChild("insertPlace", {read: ElementRef}) insertPlaceEl: ElementRef;

    constructor(private _popupService: PopupService) {
    }

    popupToolTip() {
        this._popupService.popup(RdkTooltip, {message: 'This is a message!'},
            this._getTooltipOptions(this.insertPlaceEl));
    }

    closeToolTip() {
        this._popupService.close();
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

