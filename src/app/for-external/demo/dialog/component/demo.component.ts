import {Component, ElementRef, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    PopupEffect, PopupInfo, PopupOptions,
    PopupService
} from "jigsaw/public_api";
import { UserDialogComponent } from "./user-dialog/user-dialog";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'dialog-component',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponentDemoComponent extends AsyncDescription {
    public demoPath = "demo/dialog/component";

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

    constructor(private _popupService: PopupService, http: HttpClient, el: ElementRef) {
        super(http, el);
    }
}
