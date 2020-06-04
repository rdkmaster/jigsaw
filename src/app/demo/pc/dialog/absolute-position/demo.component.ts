import {Component, TemplateRef, ViewChild, ViewEncapsulation} from "@angular/core";
import {PopupEffect, PopupInfo, PopupOptions, PopupService} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogAbsolutePositionDemoComponent {
    public isModal: boolean = false;
    public popPositionTypes = [
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
    public selectedPositionType: any;
    public popupInfo: PopupInfo;

    @ViewChild('tpDialog', {static: false})
    private _tpDialog: TemplateRef<any>;

    constructor(private _popupService: PopupService) {
        this.selectedPositionType = this.popPositionTypes[0];
    }

    public onModalChange() {
        if (!this.popupInfo) {
            return;
        }
        this.closeDialog();
        this.popupComponentDialog();
    }

    public closeDialog() {
        if (this.popupInfo) {
            this.popupInfo.dispose();
            this.popupInfo = null;
        }
    }

    public popupComponentDialog() {
        const options: PopupOptions = {
            modal: !!this.isModal,
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut
        };
        if (this.selectedPositionType.label != 'center') {
            options.pos = this.selectedPositionType.label;
            options.posOffset = this.selectedPositionType.offset;
        }

        if (this.popupInfo) {
            this._popupService.setPosition(options, this.popupInfo.element);
        } else {
            this.popupInfo = this._popupService.popup(this._tpDialog, options);
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个demo介绍了弹出对话框四个方位弹出的绝对位置：靠上、靠左、靠右、考下';
    description: string = '[这里详细介绍了`PopupService`，请仔细阅读](/#/pc/popup/introduce)。';
}
