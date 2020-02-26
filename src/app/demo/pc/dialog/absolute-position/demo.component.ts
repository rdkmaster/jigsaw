import {Component, TemplateRef, ViewChild, ViewEncapsulation} from "@angular/core";
import {PopupEffect, PopupInfo, PopupOptions, PopupService} from "jigsaw/common/service/popup.service";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogAbsolutePositionDemoComponent {
    public _$isModal: boolean = false;
    public _$popPositionTypes = [
        {label: "center"},
        {label: "top", offset: {top: 16}},
        {label: "left", offset: {left: 16}},
        {label: "right", offset: {right: 16}},
        {label: "bottom", offset: {bottom: 16}},
        {label: "leftTop", offset: {left: 16, top: 16}},
        {label: "leftBottom", offset: {left: 16, bottom: 16}},
        {label: "rightTop", offset: {right: 16, top: 16}},
        {label: "rightBottom", offset: {right: 16, bottom: 16}}
    ];
    public objectKeys = Object.keys;
    public _$selectedPositionType: any;
    public _$popupInfo: PopupInfo;

    @ViewChild('tpDialog', {static: false})
    private _tpDialog: TemplateRef<any>;

    constructor(private _popupService: PopupService) {
        this._$selectedPositionType = this._$popPositionTypes[0];
    }

    public _$onModalChange() {
        if (!this._$popupInfo) {
            return;
        }
        this._$closeDialog();
        this._$popupComponentDialog();
    }

    public _$closeDialog() {
        if (this._$popupInfo) {
            this._$popupInfo.dispose();
            this._$popupInfo = null;
        }
    }

    public _$popupComponentDialog() {
        const options: PopupOptions = {
            modal: !!this._$isModal,
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut
        };
        if (this._$selectedPositionType.label != 'center') {
            options.pos = this._$selectedPositionType.label;
            options.posOffset = this._$selectedPositionType.offset;
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

