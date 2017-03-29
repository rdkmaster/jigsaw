import {Component} from "@angular/core";

import {UseDialogComponent} from './use-dialog/use-dialog';

import {
    PopupService, PopupEffect, PopupOptions
} from '../../../../../core/service/popup.service';

@Component({
    templateUrl: 'dialog.html'
})
export class DialogDemoComponent {

    constructor(private _popupService: PopupService) {
    }

    popup() {
        this._popupService.popup(UseDialogComponent, this._getDialogOptions());
    }

    private _getDialogOptions(): PopupOptions {
        return {
            modal: true, //是否模态
            showEffect: PopupEffect.fadeIn,//弹出的动效，fadeIn/fadeOut，wipeIn/wipeOut
            hideEffect: PopupEffect.fadeOut //隐藏的动效，fadeIn/fadeOut，wipeIn/wipeOut
        };
    }
}

