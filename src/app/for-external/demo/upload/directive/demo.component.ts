import { Component } from "@angular/core";
import { UploadFileInfo } from "jigsaw/public_api";
import { UploadTextService } from "../doc.service";

@Component({
    selector: 'upload-directive',
    templateUrl: './demo.component.html'
})
export class UploadDirectiveDemoComponent {
    public fileType = '.png';
    public multiple: boolean;
    public isButtonUploadWaiting: boolean;
    public isLinkUploadWaiting: boolean;
    public uploadedFile: string = '';
    public maxSize: number = 1024;
    public minSize: number = 0;

    public getUploadFile(fileInfo: UploadFileInfo) {
        console.log('one file uploaded', fileInfo);
    }

    public getAllUploadFiles(fileInfoList: UploadFileInfo[], mode?: string) {
        console.log('all files uploaded', fileInfoList);
        switch (mode) {
            case 'button':
                this.isButtonUploadWaiting = false;
                break;
            case 'link':
                this.isLinkUploadWaiting = false;
        }
    }

    public showUploadFileName(files?: UploadFileInfo[]) {
        console.log(files);
        this.uploadedFile = !!files ? files.map(f => f.name).join(', ') : '正在上传...';
    }

    constructor(public doc: UploadTextService) {
    }
}
