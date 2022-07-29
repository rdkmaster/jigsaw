import {Component, TemplateRef, ViewChild, ViewEncapsulation} from "@angular/core";
import {PopupEffect, PopupInfo, PopupOptions, PopupService} from "jigsaw/public_api";
import {DialogTextService} from "../doc.service";

@Component({
    selector: 'dialog-basic',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogBasicDemoComponent {
    public isModal: boolean = false;
    public popPositionTypes = [
        {label: "居中"},
        {label: "靠上", offset: {top: 16}},
        {label: "靠左", offset: {left: 16}},
        {label: "靠右", offset: {right: 16}},
        {label: "靠下", offset: {bottom: 16}},
        {label: "左上", offset: {left: 16, top: 16}},
        {label: "左下", offset: {left: 16, bottom: 16}},
        {label: "右上", offset: {right: 16, top: 16}},
        {label: "右下", offset: {right: 16, bottom: 16}}
    ];
    public objectKeys = Object.keys;
    public selectedPositionType: any;
    public popupInfo: PopupInfo;

    @ViewChild('tpDialog')
    private _tpDialog: TemplateRef<any>;

    constructor(private _popupService: PopupService, public text: DialogTextService) {
        this.selectedPositionType = this.popPositionTypes[0];
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
}
