import {Component} from "@angular/core";

import {UseDialogComponent} from './use-dialog/use-dialog';
import {UseDialog2Component} from './use-dialog2/use-dialog';

import {
    PopupService, PopupEffect, PopupOptions, PopupPositionType, PopupPositionXy
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

    popupAtPoint(event) {
        this._popupService.popup(UseDialog2Component, this._getDialogOptionsTwo(event));
    }

    private _getDialogOptions(): PopupOptions {
        return {
            modal: true, //是否模态
            showEffect: PopupEffect.fadeIn,//弹出的动效，fadeIn/fadeOut，wipeIn/wipeOut
            hideEffect: PopupEffect.fadeOut //隐藏的动效，fadeIn/fadeOut，wipeIn/wipeOut
        };
    }

    private _getDialogOptionsTwo(event): PopupOptions {
        return {
            modal: false, //是否模态
            showEffect: PopupEffect.fadeIn,//弹出的动效，fadeIn/fadeOut，wipeIn/wipeOut
            hideEffect: PopupEffect.fadeOut, //隐藏的动效，fadeIn/fadeOut，wipeIn/wipeOut
            pos: new PopupPositionXy(event.clientX, event.clientY),
            posOffset: {
                top: 0,
                left: 0
            },
            posType: PopupPositionType.absolute,
        };
    }
}

