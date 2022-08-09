import { Component } from '@angular/core';
import { JigsawToast } from 'jigsaw/public_api';
import {ToastTextService} from "../doc.service";

@Component({
    selector: 'toast-basic',
    templateUrl: './demo.component.html',
    styles:  [`
        .toast-basic-demo-cntr {
            width: 200px;
        }
    `]
})
export class ToastBasicDemoComponent {
    show() {
        JigsawToast.show('这是Toast默认提示框')
    }
    constructor(public text: ToastTextService) {
    }
}
