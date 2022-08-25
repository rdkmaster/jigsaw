import {Component, ElementRef, TemplateRef, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PopupEffect, PopupInfo, PopupOptions, PopupService} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'dialog-modal',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss']
})
export class DialogModalDemoComponent extends AsyncDescription {
    public demoPath = "demo/dialog/modal";

    public isModal: boolean = true;
    public popPositionTypes = [
        { label: "左上", value: "leftTop", offset: { left: 16, top: 16 } },
        { label: "顶部", value: "top", offset: { top: 16 } },
        { label: "右上", value: "rightTop", offset: { right: 16, top: 16 } },
        { label: "左部", value: "left", offset: { left: 16 } },
        { label: "中间", value: "center" },
        { label: "右部", value: "right", offset: { right: 16 } },
        { label: "左下", value: "leftBottom", offset: { left: 16, bottom: 16 } },
        { label: "下部", value: "bottom", offset: { bottom: 16 } },
        { label: "右下", value: "rightBottom", offset: { right: 16, bottom: 16 } }
    ];
    public popupInfo: PopupInfo;

    @ViewChild('tpDialog')
    private _tpDialog: TemplateRef<any>;

    constructor(private _popupService: PopupService, http: HttpClient, el: ElementRef) {
        super(http, el);
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
