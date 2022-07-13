import { Component } from '@angular/core';
import { JigsawToast } from 'jigsaw/public_api';
import {ToastTextService} from "../text.service";

@Component({
    selector: 'basic-toast',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class ToastBasicDemoComponent {
    show() {
        JigsawToast.show('这是Toast默认提示框')
    }

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

    constructor(public text: ToastTextService) {
    }
}
