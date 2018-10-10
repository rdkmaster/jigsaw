import {Component} from "@angular/core";
import {UploadFileInfo} from "jigsaw/component/upload/upload.base";

@Component({
    templateUrl: './demo.component.html'
})
export class uploadDemoComponent {
    fileType = ['.png'];

    fileTypes = ['.png', '.docx', '.json', '.png, .jpg'];

    multiple: boolean;

    getUploadFile(fileInfo: UploadFileInfo) {
        console.log('one file uploaded',fileInfo);
    }

    getAllUploadFiles(fileInfoList: UploadFileInfo[]) {
        console.log('all files uploaded', fileInfoList);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';

}

