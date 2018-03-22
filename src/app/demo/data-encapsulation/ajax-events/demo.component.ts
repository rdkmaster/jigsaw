import {Component} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";
import {LoadingService} from "jigsaw/service/loading.service";
import {HttpClient} from "@angular/common/http";
import {PopupInfo} from "../../../../jigsaw/service/popup.service";

@Component({
    templateUrl: './demo.component.html'
})
export class AjaxEventsDemoComponent {
    consoleTexts = new ArrayCollection<string>();
    array: ArrayCollection<string>;
    loadingInfo: PopupInfo;

    constructor(http: HttpClient, private loading: LoadingService) {
        this.array = new ArrayCollection();
        this.array.http = http;

        this.array.onAjaxStart(this.onAjaxStart, this);
        this.array.onAjaxSuccess(this.onAjaxSuccess, this);
        this.array.onAjaxError(this.onAjaxError, this);
        this.array.onAjaxComplete(this.onAjaxComplete, this);
    }

    load(success: boolean) {
        this.consoleAppend("-----------------------------");
        this.array.fromAjax(success ? 'mock-data/core-members' : 'invalid-url');
    }

    onAjaxStart() {
        this.loadingInfo = this.loading.show();
        this.consoleAppend("onAjaxStart invoked!")
    }

    onAjaxSuccess() {
        this.loadingInfo.dispose();
        this.consoleAppend("onAjaxSuccess invoked!")
    }

    onAjaxError() {
        this.loadingInfo.dispose();
        this.consoleAppend("onAjaxError invoked!")
    }

    onAjaxComplete() {
        this.consoleAppend("onAjaxComplete invoked!");
    }

    consoleAppend(msg: string): void {
        this.consoleTexts.push((this.consoleTexts.length + 1) + ': ' + msg);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '演示了如何在ajax请求过程中的各个重要阶段添加回调函数';
    description: string = '';
    tags: string[] = [
        "LoadingService.show", "IAjaxComponentData.onAjaxStart",
        "IAjaxComponentData.onAjaxSuccess", "IAjaxComponentData.onAjaxError",
        "IAjaxComponentData.onAjaxComplete",
    ];
}
