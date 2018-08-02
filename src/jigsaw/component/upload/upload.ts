import {Component, ElementRef, NgModule, ViewChild} from "@angular/core";
import {AbstractJigsawComponent} from "../common";
import {JigsawBoxModule} from "../box/index";
import {JigsawButtonModule} from "../button/button";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'jigsaw-upload, j-upload',
    templateUrl: 'upload.html',
    host: {
        '[class.jigsaw-upload]': 'true',
    }
})
export class JigsawUpload extends AbstractJigsawComponent {
    constructor(private _http: HttpClient) {
        super();
    }

    @ViewChild('fileInput') fileInput: ElementRef;

    public _$selectFile($event) {
        $event.preventDefault();
        $event.stopPropagation();
        let e = document.createEvent("MouseEvent");
        e.initEvent("click", true, true);
        this.fileInput.nativeElement.dispatchEvent(e);
    }

    public _$upload() {
        const fileInput = this.fileInput.nativeElement;
        const files = Array.from(fileInput['files']);
        if(!files || !files.length) {
            console.warn('there are no upload files');
            return;
        } else if(files.length > 10) {
            console.warn('there are too more upload files');
            return;
        }

        files.forEach((file: File) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append("filename", encodeURI(file.name));
            this._http.post('/rdk/service/common/upload', formData, {responseType: 'text'}).subscribe(res => {
                console.log(res);
            });
        })
    }
}

@NgModule({
    imports: [JigsawBoxModule, JigsawButtonModule],
    declarations: [JigsawUpload],
    exports: [JigsawUpload]
})
export class JigsawUploadModule{

}
