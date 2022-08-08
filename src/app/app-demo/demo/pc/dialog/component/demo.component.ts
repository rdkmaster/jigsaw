import {Component, ViewEncapsulation} from "@angular/core";
import {
    PopupEffect, PopupInfo, PopupOptions,
    PopupService
} from "jigsaw/public_api";
import {UserDialogComponent} from "./user-dialog/user-dialog";
import {DialogTextService} from "../doc.service";

@Component({
    selector: 'dialog-component',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponentDemoComponent {
    dialogInfo1: PopupInfo;

    public title: string = 'Title of the dialog';

    constructor(private _popupService: PopupService, public text: DialogTextService) {
    }
    popupComponentDialog() {
        const initData = {inputData: 'some data...'};
        this._popupService.popup(UserDialogComponent, this.getModalOptions(), initData);
    }
    getModalOptions(): PopupOptions {
        return {
            modal: true, //是否模态
            showEffect: PopupEffect.bubbleIn,
            hideEffect: PopupEffect.bubbleOut
        };
    }
}
