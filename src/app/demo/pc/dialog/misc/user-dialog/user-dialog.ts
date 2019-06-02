import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {DialogBase, JigsawDialog} from "jigsaw/pc-components/dialog/dialog";

@Component({
    templateUrl: 'user-dialog.html',
    styleUrls: ['./user-dialog.css']
})
export class UserDialogComponent extends DialogBase implements AfterViewInit {
    // 这个变量是父类所需，就照着这么写就行啦
    @ViewChild(JigsawDialog, {static: false}) public dialog: JigsawDialog;

    gotoGithub() {
        window.open('https://github.com/rdkmaster/jigsaw', '_blank');
    }

    ngAfterViewInit() {
        console.log(`input data is: ${this.initData.inputData}`);
    }
}

