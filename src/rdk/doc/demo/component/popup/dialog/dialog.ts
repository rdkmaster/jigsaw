import {Component} from "@angular/core";

import {Dialog1Component} from './use-dialog/use-dialog';

import {
    PopupService, PopupEffect, PopupOptions
} from '../../../../../core/service/popup.service';

@Component({
    templateUrl: 'dialog.html'
})
export class DialogDemoComponent {

    constructor(private _popupService: PopupService) {
    }

    popupModal() {
        this._popupService.popup(Dialog1Component, {test: () => {console.log('modal test function called!')}}, this._getModalOptions());
    }

    private _getModalOptions(): PopupOptions {
        return {
            modal: true, //是否模态
            showEffect: PopupEffect.fadeIn,//弹出的动效，fadeIn/fadeOut，wipeIn/wipeOut
            hideEffect: PopupEffect.fadeOut //隐藏的动效，fadeIn/fadeOut，wipeIn/wipeOut
        };
    }
}

