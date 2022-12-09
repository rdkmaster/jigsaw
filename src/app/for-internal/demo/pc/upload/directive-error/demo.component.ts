import {Component, ViewChild} from "@angular/core";
import {JigsawNotification, JigsawUploadDirective, UploadFileInfo} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
})

export class UploadDirectiveErrorDemoComponent {
    fileType = '.zip';
    multiple: boolean;
    isButtonUploadWaiting: boolean;
    maxSize: number = 1024;
    minSize: number = 0;

    @ViewChild(JigsawUploadDirective)
    firstJigsawUploadDirective: JigsawUploadDirective

    getUploadFile(fileInfo: UploadFileInfo) {
        console.log('one file uploaded', fileInfo);
    }

    getFailFile(fileInfo: UploadFileInfo[]) {
        const failMessage: string[] = fileInfo.map(f => f.name + " " + f.message);
        console.log('files fail to uploaded: '+ failMessage.join("\n"));
        JigsawNotification.showError(failMessage.join("<br>"))
        this.firstJigsawUploadDirective.clear();
    }

    getAllUploadFiles(fileInfoList: UploadFileInfo[]) {
        console.log('all files uploaded', fileInfoList);
        this.isButtonUploadWaiting = false;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo展示了`jigsaw-upload`指令在有文件上传失败时如何报错';
    description: string = '';
}
