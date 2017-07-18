import {Component, ElementRef, ViewChild} from "@angular/core";
import {PopupEffect, PopupInfo, PopupPositionType, PopupService} from "jigsaw/service/popup.service";
import {UserTooltipDialogComponent} from "./user-defined-tooltip-dialog";

@Component({
    template: `
        <div style="padding-top: 40px">
            <jigsaw-button #insertPlace (mouseenter)="popup()" (mouseleave)="close()">
                <span class="fa fa-thumbs-up"></span>tooltip dialog!
            </jigsaw-button>
        </div>
    `
})
export class TooltipDialogDemoComponent {
     _tooltipInfo: PopupInfo;
    @ViewChild("insertPlace", {read: ElementRef}) insertPlaceEl: ElementRef;

    constructor(private _popupService: PopupService) {
    }

    popup() {
        this._tooltipInfo = this._popupService.popup(UserTooltipDialogComponent, {
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
        this._tooltipInfo.dispose();
    }
}

