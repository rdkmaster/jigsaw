import {Component, TemplateRef, ViewChild, ViewEncapsulation} from "@angular/core";
import {PopupEffect, PopupInfo, PopupOptions, PopupService} from "jigsaw/public_api";
import {DialogTextService} from "../doc.service";

@Component({
    selector: 'dialog-basic',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
// <jigsaw-button click="i">{{item.label}}

export class DialogBasicDemoComponent {
    public isModal: boolean = false;
    public popPositionTypes = [
        {label: "左上", value: "leftTop", offset: {left: 16, top: 16}},
        {label: "顶部", value: "top", offset: {top: 16}},
        {label: "右上", value: "rightTop", offset: {right: 16, top: 16}},
        {label: "左部", value: "left", offset: {left: 16}},
        {label: "中间", value: "center"},
        {label: "右部", value: "right", offset: {right: 16}},
        {label: "左下", value: "leftBottom", offset: {left: 16, bottom: 16}},
        {label: "下部", value: "bottom", offset: {bottom: 16}},
        {label: "右下", value: "rightBottom", offset: {right: 16, bottom: 16}}
    ];
    public popupInfo: PopupInfo;

    @ViewChild('tpDialog')
    private _tpDialog: TemplateRef<any>;

    constructor(private _popupService: PopupService, public doc: DialogTextService) {
    }
    public closeDialog() {
        if (this.popupInfo) {
            this.popupInfo.dispose();
            this.popupInfo = null;
        }
    }

    public popupComponentDialog(selectedPositionType) {
        const options: PopupOptions = {
            modal: !!this.isModal,
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut
        };
        options.pos = selectedPositionType.value;
        if (selectedPositionType.value != 'center') {

            options.posOffset = selectedPositionType.offset;
        }

        if (this.popupInfo) {
            this._popupService.setPosition(options, this.popupInfo.element);
        } else {
            this.popupInfo = this._popupService.popup(this._tpDialog, options);
        }
    }
}
