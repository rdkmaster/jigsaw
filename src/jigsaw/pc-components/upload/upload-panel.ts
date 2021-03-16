import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    NgZone
} from "@angular/core";
import { AbstractJigsawComponent } from "jigsaw/common/common";
import { JigsawUploadDirective } from "jigsaw/common/directive/upload/upload.directive";
import { UploadFileInfo } from "./upload.base";

@Component({
    selector: "jigsaw-upload-panel, j-upload-panel",
    templateUrl: "upload-panel.html",
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        "[class.jigsaw-upload-panel-host]": "true"
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawUploadPanel extends AbstractJigsawComponent {
    constructor(protected _cdr: ChangeDetectorRef, protected _zone?: NgZone) {
        super(_zone);
    }
    public _uploader: JigsawUploadDirective;

    @Input()
    public get uploader(): JigsawUploadDirective {
        return this._uploader;
    }

    public set uploader(value: JigsawUploadDirective) {
        if (!value) {
            return;
        }
        this._uploader = value;
        this._uploader.update.subscribe(fileData => {
            console.group("update");
            console.log(fileData);
            console.groupEnd();
            this._$fileData = [...fileData];
            console.log(this._$fileData);
            this._cdr.markForCheck();
        });
    }

    public _$fileData: UploadFileInfo[] = [];

    public updatePanel() {}
}
