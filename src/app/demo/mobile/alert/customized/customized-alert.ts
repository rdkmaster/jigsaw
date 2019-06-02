import {Component, ViewChild, ViewEncapsulation} from "@angular/core";
import {DialogBase, JigsawMobileDialog} from "jigsaw/mobile-components/dialog/dialog";
import {JigsawMobileAlert} from "jigsaw/mobile-components/alert/alert";

@Component({
    selector: 'my-alert',
    templateUrl: 'customized-alert.html',
    styleUrls: ['./customized-alert.css'],
    encapsulation: ViewEncapsulation.None
})
//todo encapsulation属性为了覆盖原来控件的样式属性，如有需要请添加自己的演示到buttons的class属性里面。
export class CustomizedAlert extends DialogBase {
    @ViewChild(JigsawMobileAlert, {static: false}) dialog: JigsawMobileDialog;

    afterClose(message?) {
        console.log("after close..." + (message ? message : ''));
    }

}

