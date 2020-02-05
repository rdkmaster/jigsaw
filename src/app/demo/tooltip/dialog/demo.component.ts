import {Component, ElementRef, ViewChild} from "@angular/core";
import {PopupEffect, PopupInfo, PopupPositionType, PopupService} from "jigsaw/service/popup.service";
import {UserTooltipDialogComponent} from "./user-defined-tooltip-dialog";

@Component({
    templateUrl: './demo.component.html'
})
export class TooltipDialogDemoComponent {
    tooltipInfo: PopupInfo;

    @ViewChild("insertPlace", {read: ElementRef}) insertPlaceEl: ElementRef;

    constructor(private _popupService: PopupService) {
    }

    popup() {
        this.tooltipInfo = this._popupService.popup(UserTooltipDialogComponent, {
            modal: false, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut,
            pos: this.insertPlaceEl, //插入点
            posOffset: { //偏移位置
                bottom: -8,
                left: 0
            },
            posType: PopupPositionType.absolute, //定位类型
        });
    }

    close() {
        this.tooltipInfo.dispose();
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

