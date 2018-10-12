import {Component} from "@angular/core";
import {UploadFileInfo} from "jigsaw/component/upload/upload.base";

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
    fileType = ['.png'];

    fileTypes = ['.png', '.docx', '.json', '.png, .jpg'];

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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';

}

