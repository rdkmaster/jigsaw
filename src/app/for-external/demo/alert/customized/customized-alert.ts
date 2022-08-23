import { Component, ViewChild } from "@angular/core";
import { DialogBase, JigsawDialog, JigsawAlert } from "jigsaw/public_api";

@Component({
    selector: 'my-alert',
    templateUrl: 'customized-alert.html'
})
export class CustomizedAlert extends DialogBase {
    @ViewChild(JigsawAlert) dialog: JigsawDialog;

    public afterClose(message?) {
        console.log("after close..." + (message ? message : ''));
    }
}
