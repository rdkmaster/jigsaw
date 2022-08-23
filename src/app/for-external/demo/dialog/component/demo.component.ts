import { Component, ViewEncapsulation } from "@angular/core";
import {
    PopupEffect, PopupInfo, PopupOptions,
    PopupService
} from "jigsaw/public_api";
import { UserDialogComponent } from "./user-dialog/user-dialog";
import { DialogTextService } from "../doc.service";

@Component({
    selector: 'dialog-component',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponentDemoComponent {
    public dialogInfo1: PopupInfo;

    public title: string = 'Title of the dialog';

    public popupComponentDialog() {
        const initData = { inputData: 'some data...' };
        this._popupService.popup(UserDialogComponent, this.getModalOptions(), initData);
    }

    public getModalOptions(): PopupOptions {
        return {
            modal: true, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut
        };
    }

    constructor(private _popupService: PopupService, public doc: DialogTextService) {
    }
}
