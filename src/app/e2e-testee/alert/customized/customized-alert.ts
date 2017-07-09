import {Component, ViewChild, ViewEncapsulation} from "@angular/core";
import {DialogBase, JigsawDialog} from "jigsaw/component/dialog/dialog";
import {JigsawAlert} from "jigsaw/component/alert/alert";
import {ButtonInfo} from "jigsaw/service/popup.service";

@Component({
    selector: 'my-alert',
    templateUrl: 'customized-alert.html',
    styleUrls: ['customized-alert.scss'],
    encapsulation: ViewEncapsulation.None
})
//todo encapsulation属性为了覆盖原来控件的样式属性，如有需要请添加自己的演示到buttons的class属性里面。
export class CustomizedAlert extends DialogBase {
    @ViewChild(JigsawAlert) dialog: JigsawDialog;

    title:string = "a customized alert";

    public buttons: ButtonInfo[] = [
        {
            label: 'ok',
            clazz: 'button-ok'
        },
        {
            label: 'ignore'
        }
    ];

    afterClose(message: any) {
        console.log("after close..." + message);
    }

}

