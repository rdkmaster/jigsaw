import {Component, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {UploadFileInfoFallback, JigsawUploadFallbackDirective, JigsawUploadFallback} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .common-param-setting {
            margin-bottom: 30px;
        }

        .common-param-setting h3 {
            font-size: 16px;
            margin-bottom: 10px;
        }

        .link-upload {
            text-decoration: underline;
            margin-left: 6px
        }
    `]
})
export class UploadBasicDemoComponent {
    fileType = '.png';
    multiple: boolean;
    isButtonUploadWaiting: boolean;
    isLinkUploadWaiting: boolean;
    uploadedFile: string = '';
    maxSize: number = 1024;
    minSize: number = 0;

    @ViewChildren('uploadDirective', {read: JigsawUploadFallbackDirective})
    uploadDirectives: QueryList<JigsawUploadFallbackDirective>;
    @ViewChild('upload')
    upload: JigsawUploadFallback;

    getUploadFile(fileInfo: UploadFileInfoFallback) {
        console.log('one file uploaded', fileInfo);
    }

    getAllUploadFiles(fileInfoList: UploadFileInfoFallback[], mode?: string) {
        console.log('all files uploaded', fileInfoList);
        switch (mode) {
            case 'button':
                this.isButtonUploadWaiting = false;
                break;
            case 'link':
                this.isLinkUploadWaiting = false;
        }
    }

    clearFileList() {
        this.uploadDirectives.forEach(upload => {
            upload.clearFileList();
        });
        this.upload.clearFileList();
    }

    showUploadFileName(files?: UploadFileInfoFallback[]) {
        this.uploadedFile = !!files ? files.map(f => f.name).join(', ') : '正在上传...';
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
