import {Component, ViewChild, ViewEncapsulation} from "@angular/core";

import {ButtonInfo} from "../../../../../../service/popup.service";
import {RdkAlert} from "../../../../../../component/alert/alert";
import {DialogBase, RdkDialog} from "../../../../../../component/dialog/dialog";

@Component({
    templateUrl: 'customized-alert.html',
    styleUrls: ['customized-alert.scss'],
    encapsulation: ViewEncapsulation.None
})
//todo encapsulation属性为了覆盖原来控件的样式属性，如有需要请添加自己的演示到buttons的class属性里面。
export class CustomizedAlert extends DialogBase {
    @ViewChild(RdkAlert) dialog: RdkDialog;

    public buttons: ButtonInfo[] = [
        {
            label: 'ok',
            clazz: 'button-ok'
        },
        {
            label: 'cancel'

        }
    ];

    afterClose(message: any) {
        console.log("after close..." + message);
    }

}

