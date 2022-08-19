import { Component } from '@angular/core';
import { JigsawToast } from 'jigsaw/public_api';
import {ToastTextService} from "../doc.service";

@Component({
    selector: 'toast-functional',
    templateUrl: './demo.component.html',
    styles:  [`
        .toast-basic-demo-cntr {
            width: 200px;
        }
    `]
})
export class ToastFunctionalDemoComponent {
    showSuccess() {
        JigsawToast.showSuccess('这是Toast成功提示框')
    }

    showError() {
        JigsawToast.showError('这是Toast错误提示框')
    }

    showWarn() {
        JigsawToast.showWarn('这是Toast警告提示框')
    }

    showInfo() {
        JigsawToast.showInfo('这是Toast信息提示框')
    }

    constructor(public doc: ToastTextService) {
    }
}
