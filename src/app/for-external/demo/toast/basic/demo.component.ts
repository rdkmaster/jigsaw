import { Component } from '@angular/core';
import { JigsawToast } from 'jigsaw/public_api';
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'toast-basic',
    templateUrl: './demo.component.html'
})
export class ToastBasicDemoComponent extends AsyncDescription {
    public demoPath = "demo/toast/basic";

    public show() {
        JigsawToast.show('这是Toast默认提示框')
    }
}
