import {Component} from "@angular/core";
import {PopupService} from "jigsaw/public_api";
import {MultiDataComponent} from "./multi-data-dialog/multi-data-dialog";

@Component({
    templateUrl: './demo.component.html',
})
export class DialogWithPromiseDemoComponent {
    constructor(private _ps: PopupService) {
    }
    public async showDialog() {
        const data = await this._ps.popup(MultiDataComponent).toPromise<string>();
        alert('对话框里返回的值是 ' + data);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何定义一个能够返回任何数据类型的对话框，以及如何配合promise来优雅得处理对话框的不同返回值。';
    description: string = '[这里详细介绍了`PopupService`，请仔细阅读](#/pc/popup/introduce)。';
}
