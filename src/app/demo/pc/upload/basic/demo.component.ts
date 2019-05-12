import {Component, QueryList, ViewChildren} from "@angular/core";
import {UploadFileInfo} from "jigsaw/pc-components/upload/upload.base";
import {JigsawUploadDirective} from "../../../../../jigsaw/pc-components/upload/upload.directive";

@Component({
    templateUrl: './demo.component.html',
    styles: [`
        .common-param-setting {
            margin-bottom: 30px;
        }
        .common-param-setting h3{
            font-size: 16px;
            margin-bottom: 10px;
        }
        .link-upload {
            text-decoration: underline;
            margin-left: 6px
        }
    `]
})
export class uploadDemoComponent {
    fileType = '.png';

    multiple: boolean;

    isButtonUploadWaiting: boolean;
    isLinkUploadWaiting: boolean;

    getUploadFile(fileInfo: UploadFileInfo) {
        console.log('one file uploaded',fileInfo);
    }

    getAllUploadFiles(fileInfoList: UploadFileInfo[], mode?: string) {
        console.log('all files uploaded', fileInfoList);
        switch(mode) {
            case 'button':
                this.isButtonUploadWaiting = false;
                break;
            case 'link':
                this.isLinkUploadWaiting =false;
        }
    }

    @ViewChildren('uploadDirective', {read: JigsawUploadDirective}) uploadDirectives: QueryList<JigsawUploadDirective>;

    clearFileList() {
        this.uploadDirectives.forEach(upload => {
            upload.clearFileList();
        })
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';

}

