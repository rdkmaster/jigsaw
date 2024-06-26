import { Component, ViewChild } from "@angular/core";
import { JigsawUpload } from 'jigsaw/public_api';

@Component({
    templateUrl: './demo.component.html'
})
export class UploadOfflineDemoComponent {
    fileType = '.txt';

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

    retry($event) {
        console.log("retry触发了", $event)
    }

    @ViewChild("demo", { read: JigsawUpload })
    public uploader: JigsawUpload;

    public run() {
        if (!this._check()) {
            return;
        }
        const file: File = this.uploader.files[0].file as File;
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = () => {
            console.log('The file result is:' + JSON.stringify(reader.result));
            this.uploader.files[0].log = [{ time: '2023-02-13 14:57:40', content: '加载中' }, { time: '2023-02-13 14:57:44', content: '已完成' }];
            this.uploader.files[0].state = 'success';
            this.uploader.files[0].progress = 100;
            this.uploader.refresh();
        }
    }

    public run2() {
        if (!this._check()) {
            return;
        }
        const file: File = this.uploader.files[0].file as File;
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = () => {
            console.log('The file result is:' + JSON.stringify(reader.result));
            this.uploader.files[0].log = [
                { time: '2023-02-13 14:57:40', content: '加载中' },
                { time: '2023-02-13 14:57:42', content: '上传中' },
                { time: '2023-02-13 14:57:44', content: '错误详情：错误请求' },
                { time: '2023-02-13 14:58:44', content: '这里可以返回错误信息' },
            ];
            this.uploader.files[0].state = 'error';
            this.uploader.files[0].progress = 70;
            this.uploader.refresh();
        }
    }

    private _check(): boolean {
        if (this.uploader?.files?.length > 0) {
            return true;
        }
        alert('先在上传组件里选择文件后再试');
        return false;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo展示了`jigsaw-upload`组件在离线场景下的的用法，离线模式可以实现选择文件后就地处理，或者实现文件内容拦截';
    description: string = '';
}
