import { Component, ViewChild } from "@angular/core";
import { JigsawUpload } from 'jigsaw/public_api';

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class UploadBasicDemoComponent {
    public _$fileType = '.txt';
    public _$batchMode: boolean;

    uploadStart($event) {
        console.log("uploadStart触发了", $event)
    }

    uploadDataSendProgress($event) {
        console.log("uploadDataSendProgress触发了", $event)
    }

    uploadProgress($event) {
        console.log("uploadProgress触发了", $event)
    }

    uploadComplete($event) {
        console.log("uploadComplete触发了", $event)
    }

    uploadChange($event) {
        console.log("uploadChange触发了", $event)
    }

    uploadRemove($event) {
        console.log("uploadRemove触发了", $event)
    }

    @ViewChild("demo6", { read: JigsawUpload })
    public uploader6: JigsawUpload;

    @ViewChild("demo7", { read: JigsawUpload })
    public uploader7: JigsawUpload;

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo展示了`jigsaw-upload`组件的基本用法';
    description: string = '';
}
