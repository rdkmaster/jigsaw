import {Component, ElementRef, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    PopupInfo,
    PopupService
} from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'dialog-customize',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DialogCustomizeDemoComponent extends AsyncDescription {
    public demoPath = "demo/dialog/customize";

    public dialogInfo1: PopupInfo;
    public dialogInfo2: PopupInfo;
    public dialogInfo3: PopupInfo;

    public title: string = 'Title of the dialog';
    /*
    * popup user defined template
    * */
    public popupTemplate(tp) {
        // 默认皮肤不会给弹框设置背景，其他皮肤会给弹框加默认背景
        this.dialogInfo3 = this._popupService.popup(tp, { useCustomizedBackground: true });
    }

    public onAnswer(message: string) {
        if (message) {
            alert(`The message is "${message}".`);
        } else {
            alert('The dialog leave no message!');
        }
        if (this.dialogInfo1) {
            this.dialogInfo1.dispose();
        }
        if (this.dialogInfo2) {
            this.dialogInfo2.dispose();
        }
        if (this.dialogInfo3) {
            this.dialogInfo3.dispose();
        }
    }

    constructor(private _popupService: PopupService, http: HttpClient, el: ElementRef) {
        super(http, el);
    }
}
