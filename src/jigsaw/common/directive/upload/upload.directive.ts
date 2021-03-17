import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    Optional,
    Output,
    Renderer2
} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {JigsawUploadBase, UploadFileInfo} from "../../../pc-components/upload/upload.base";

@Directive({
    selector: '[j-upload], [jigsaw-upload]'
})
export class JigsawUploadDirective extends JigsawUploadBase implements OnDestroy {
    constructor(@Optional() protected _http: HttpClient,
                protected _renderer: Renderer2,
                protected _elementRef: ElementRef,
                @Optional() protected _translateService: TranslateService,
                protected _cdr: ChangeDetectorRef) {
        super(_http, _renderer, _elementRef, _translateService, _cdr);
    }

    @Input('uploadTargetUrl')
    public targetUrl: string = '/rdk/service/common/upload';

    @Input('uploadFileType')
    public fileType: string;

    @Input('uploadMultiple')
    public multiple: boolean = true;

    @Input('uploadContentField')
    public contentField: string = 'file';

    @Input('uploadFileNameField')
    public fileNameField: string = 'filename';

    @Input('uploadFileVerify')
    public fileVerify: string;

    @Input('uploadAdditionalFields')
    public additionalFields: { [prop: string]: string };

    @Input('uploadMinSize')
    public minSize: number;

    @Input('uploadMaxSize')
    public maxSize: number;

    @Output('uploadProgress')
    public progress = new EventEmitter<UploadFileInfo>();

    @Output('uploadRemove')
    public remove = new EventEmitter<UploadFileInfo>();

    @Output('uploadComplete')
    public complete = new EventEmitter<UploadFileInfo[]>();

    @Output('uploadStart')
    public start = new EventEmitter<UploadFileInfo[]>();

    @Output('uploadUpdate')
    public update = new EventEmitter<UploadFileInfo[]>();

    @Input()
    public uploadOptionCount: number;

    @Input()
    public uploadShowFileList: boolean = true;

    @HostListener('click', ['$event'])
    onClick($event) {
        this._$selectFile($event);
    }

    protected _upload() {
        super._upload();
    }

    /**
     * @internal
     */
    public _$removeFile(file: UploadFileInfo) {
        super._$removeFile(file);
    }

    /**
     * @internal
     */
    public _$reUpload(file: UploadFileInfo) {
        super._$reUpload(file);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}