import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {DialogBase, JigsawDialog} from "jigsaw/public_api";

@Component({
    templateUrl: 'multi-data-dialog.html',
    styleUrls: ['./multi-data-dialog.css']
})
export class MultiDataComponent extends DialogBase<string> implements AfterViewInit {
    // 这个变量是父类所需，就照着这么写就行啦
    @ViewChild(JigsawDialog)
    public dialog: JigsawDialog;
}
