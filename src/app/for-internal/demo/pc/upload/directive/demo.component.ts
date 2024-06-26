import {Component} from "@angular/core";
import {UploadFileInfo} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class UploadDirectiveDemoComponent {
    fileType = '.png';
    multiple: boolean;
    isButtonUploadWaiting: boolean;
    isLinkUploadWaiting: boolean;
    uploadedFile: string = '';
    maxSize: number = 1024;
    minSize: number = 0;

    getUploadFile(fileInfo: UploadFileInfo) {
        console.log('one file uploaded', fileInfo);
    }

    getAllUploadFiles(fileInfoList: UploadFileInfo[], mode?: string) {
        console.log('all files uploaded', fileInfoList);
        switch (mode) {
            case 'button':
                this.isButtonUploadWaiting = false;
                break;
            case 'link':
                this.isLinkUploadWaiting = false;
        }
    }

    showUploadFileName(files?: UploadFileInfo[]) {
        console.log(files);
        this.uploadedFile = !!files ? files.map(f => f.name).join(', ') : '正在上传...';
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo展示了`jigsaw-upload`指令的基本用法';
    description: string = '';
}
