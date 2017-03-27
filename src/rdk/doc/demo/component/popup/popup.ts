import {Component, ViewChild, ElementRef} from "@angular/core";

import {InsertComponent} from './modal/modal';
import {RdkToolTip} from './tooltip/tooltip';

import {
    PopupService, PopupEffect, PopupOptions, PopupPositionType
} from '../../../../core/service/popup.service';

@Component({
    templateUrl: 'popup.html'
})
export class PopupDemoComponent {
    @ViewChild("insertPlace", {read: ElementRef}) insertPlaceEl: ElementRef;

    constructor(private _popupService: PopupService) {
    }

    popupModal() {
        this._popupService.popup(InsertComponent, this._getModalOptions());
    }

    popupToolTip() {
        this._popupService.popup(RdkToolTip, this._getToolTipOptions(this.insertPlaceEl));
    }

    closeToolTip() {
        this._popupService.close();
    }

    private _getToolTipOptions(insertPlaceEl: ElementRef): PopupOptions {
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

    private _getModalOptions(): PopupOptions {
        return {
            modal: true, //是否模态
            showEffect: PopupEffect.fadeIn,//弹出的动效，fadeIn/fadeOut，wipeIn/wipeOut
            hideEffect: PopupEffect.fadeOut //隐藏的动效，fadeIn/fadeOut，wipeIn/wipeOut
        };
    }
}

