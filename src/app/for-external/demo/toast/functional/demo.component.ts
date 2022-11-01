import { Component } from '@angular/core';
import { JigsawToast } from 'jigsaw/public_api';
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'toast-functional',
    templateUrl: './demo.component.html',
    styles: [`
        .toast-basic-demo-cntr {
            width: 200px;
        }
    `]
})
export class ToastFunctionalDemoComponent extends AsyncDescription {
    public demoPath = "demo/toast/functional";

    public showSuccess() {
        JigsawToast.showSuccess('这是Toast成功提示框')
    }

    public showError() {
        JigsawToast.showError('这是Toast错误提示框')
    }

    public showWarn() {
        JigsawToast.showWarn('这是Toast警告提示框')
    }

    public showInfo() {
        JigsawToast.showInfo('这是Toast信息提示框')
    }
}
