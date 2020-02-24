import {Component, TemplateRef, ViewChild, ViewEncapsulation} from "@angular/core";
import {PopupEffect, PopupInfo, PopupOptions, PopupService} from "jigsaw/common/service/popup.service";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogAbsolutePositionDemoComponent {
    public _$offset: number = 16;
    public _$isModel: boolean = false;
    public _$popPositionTypes: string[] = ['top', 'left', 'right', 'bottom', 'center'];
    public _$selectedPositionType: any = 'center';
    public _$popupInfo: PopupInfo;

    @ViewChild('tpDialog', {static: false})
    private _tpDialog: TemplateRef<any>;

    constructor(private _popupService: PopupService) {
    }

    public _$closeDialog() {
        if (this._$popupInfo) {
            this._$popupInfo.dispose();
            this._$popupInfo = null;
        }
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

        if (this._$popupInfo) {
            this._popupService.setPosition(options, this._$popupInfo.element);
        } else {
            this._$popupInfo = this._popupService.popup(this._tpDialog, options);
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo介绍了弹出对话框四个方位弹出的绝对位置：靠上、靠左、靠右、考下';
    description: string = '[这里详细介绍了`PopupService`，请仔细阅读](/#/pc/popup/introduce)。';
}

