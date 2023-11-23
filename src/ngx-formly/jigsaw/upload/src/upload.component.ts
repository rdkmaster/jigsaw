import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {IJigsawFormControl, JigsawUploadBase, JigsawUploadDirective, JigsawUploadResult, UploadFileInfo} from "@rdkmaster/jigsaw";

@Component({
    selector: 'formly-jigsaw-upload',
    template: `
        <div class="formly-jigsaw-upload-button">
            <jigsaw-button
                [width]="width"
                [disabled]="disabled"
                [colorType]="colorType"
                [preSize]="preSize"
                [icon]="icon"
                [theme]="theme"
                j-upload
                [uploadTargetUrl]="targetUrl"
                [uploadFileType]="fileType"
                [uploadMultiple]="multiple"
                [uploadContentField]="contentField"
                [uploadFileNameField]="fileNameField"
                [uploadFileVerify]="fileVerify"
                [uploadAdditionalFields]="additionalFields"
                [uploadMinSize]="minSize"
                [uploadMaxSize]="maxSize"
                [uploadImmediately]="uploadImmediately"
                (uploadProgress)="progress.emit($event)"
                (uploadDataSendProgress)="dataSendProgress.emit($event)"
                (uploadComplete)="_$complete($event)"
                (uploadStart)="start.emit($event)"
                (uploadChange)="_$uploadChange($event)"
            >{{content}}</jigsaw-button>
            <a *ngIf="clearable && showUploadResult && files.length > 0" class="formly-jigsaw-upload-button-clear"
               [title]="'formUpload.clear' | translate" (click)="clear()">
                <i class="iconfont iconfont-e865"></i>
            </a>
        </div>
        <jigsaw-upload-result *ngIf="showUploadResult && files.length > 0" width="100%"
                              [uploader]="uploader"
                              [theme]="theme"
                              (change)="_$resultChange($event)"
                              (progress)="resultProgress.emit($event)"
                              (remove)="resultRemove.emit($event)">
        </jigsaw-upload-result>
    `,
    styles: [`
        .formly-jigsaw-upload-button {
            width: calc(100% - 22px);
            display: flex;
            align-items: center;
        }

        .formly-jigsaw-upload-button-clear {
            font-size: 16px;
            margin-left: 6px;
        }
    `],
    host: {
        '[style.display]': "'block'",
        '[style.flex]': '1',
        '[style.width]': 'width',
        '[style.height]': 'height',
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormlyUploadComponent), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyUploadComponent extends JigsawUploadBase implements IJigsawFormControl, ControlValueAccessor {
    @ViewChild(JigsawUploadDirective)
    public uploader: JigsawUploadDirective;
    @ViewChild(JigsawUploadResult)
    public uploadResult: JigsawUploadResult;

    /**
     * 当前封装的组件属性
     */
    @Input()
    public content: string = '上传';
    @Input()
    public showUploadResult: boolean = true;
    @Input()
    public clearable: boolean = true;
    @Input()
    public valid: boolean = true;
    @Input()
    public theme: 'light' | 'dark' | string;

    /**
     * 按钮本身的几个属性
     */
    @Input()
    public disabled: boolean = false;
    @Input()
    public colorType: 'default' | 'primary' | 'warning' | 'error' | 'danger' = 'default';
    @Input()
    public preSize: 'default' | 'small' | 'medium' | 'large' = 'default';
    @Input()
    public icon: string;

    /**
     * 上传结果的三个事件，这里加上前缀 result：
     * 一是为了跟 upload 指令的事件作区分
     * 二是因为，change 这个名称也是 TemplateOption 里面内置的属性名称，这里没法直接使用
     */
    @Output()
    public resultChange: EventEmitter<UploadFileInfo[]> = new EventEmitter<UploadFileInfo[]>();
    @Output()
    public resultProgress = new EventEmitter<UploadFileInfo>();
    @Output()
    public resultRemove = new EventEmitter<UploadFileInfo>();

    constructor(private _changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    /**
     * 返回当前上传的文件信息
     */
    public get files(): UploadFileInfo[] {
        return this.uploader ? this.uploader.files : [];
    }

    /**
     * 配置为手动上传时，调用此方法进行文件上传
     */
    public upload(): void {
        this.uploader?.upload();
    }

    /**
     * 清空上传结果
     */
    public clear(): void {
        this.uploadResult?.clear();
        this._propagateChange([]);
    }

    public _$uploadChange($event: UploadFileInfo[]): void {
        this.change.emit($event);
        this._propagateChange($event);
    }

    public _$complete($event: UploadFileInfo[]): void {
        this.complete.emit($event);
        this._propagateChange($event);
    }

    public _$resultChange($event: UploadFileInfo[]): void {
        this.resultChange.emit($event);
        this._propagateChange($event);
    }

    protected _propagateChange: any = () => {
    };
    protected _onTouched: any = () => {
    };

    registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    writeValue(value: any): void {
        this._propagateChange(value);
        this._changeDetectorRef.markForCheck();
    }

    @HostListener('click')
    onClickTrigger(): void {
        if (this.disabled) {
            return;
        }
        this._onTouched();
    }

    public setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }
}
