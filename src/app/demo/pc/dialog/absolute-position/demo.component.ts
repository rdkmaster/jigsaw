import {Component, ViewEncapsulation} from "@angular/core";
import {PopupEffect, PopupOptions, PopupPositionType, PopupService} from "jigsaw/common/service/popup.service";
import {UserDialog2Component} from "../misc/user-dialog2/user-dialog";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogAbsolutePositionDemoComponent {
    public _$offset: number;
    public _$isModel: boolean;
    public _$popPositionTypes: string[] = ['top', 'left', 'right', 'bottom', 'center'];
    public _$selectedPositionType: any = 'center';

    constructor(private _popupService: PopupService) {
    }

    public _$popupComponentDialog() {
        const options: PopupOptions = {
            modal: !!this._$isModel,
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut,
            posOffset: {}
        };
        if (this._$selectedPositionType != 'center') {
            options.pos = this._$selectedPositionType;
            options.posOffset[this._$selectedPositionType] = this._$offset;
        }
        const popupInfo = this._popupService.popup(UserDialog2Component, options);
        popupInfo.answer.subscribe(answer => {
            alert(answer.message ? answer.message : 'the dialog leave no message')
        });
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo介绍了弹出对话框四个方位弹出的绝对位置：靠上、靠左、靠右、考下';
    description: string = '[这里详细介绍了`PopupService`，请仔细阅读](#/pc/popup/introduce)。';
}

