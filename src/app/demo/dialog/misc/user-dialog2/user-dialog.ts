import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {DialogBase, JigsawDialog} from "jigsaw/component/dialog/dialog";


@Component({
    templateUrl: 'user-dialog.html',
    styleUrls: ['user-dialog.scss']
})
export class UserDialog2Component extends DialogBase implements AfterViewInit {
    // 这个变量是父类所需，就照着这么写就行啦
    @ViewChild(JigsawDialog) dialog: JigsawDialog;

    // 将数据传给对话框外部
    emitMessage(msg) {
        this.answer.emit({message: msg});
        this.dispose();
    }

    gotoGithub() {
        window.open('https://github.com/rdkmaster/jigsaw', '_blank');
    }

    ngAfterViewInit() {
        console.log(`input data is: ${this.initData.inputData}`);
    }
}

