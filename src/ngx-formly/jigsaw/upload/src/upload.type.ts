import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {JigsawUploadDirective, JigsawUploadResult, UploadFileInfo} from "@rdkmaster/jigsaw";
import {ColorType, SizeType} from "@ngx-formly/jigsaw/button";

@Component({
    selector: 'formly-field-jigsaw-upload',
    template: `
        <jigsaw-button [width]="to.width"
                       [formlyAttributes]="field"
                       [disabled]="to.disabled"
                       [colorType]="to.colorType"
                       [preSize]="to.preSize"
                       [icon]="to.icon"
                       (click)="to.click"
                       j-upload
                       [uploadTargetUrl]="to.uploadTargetUrl"
                       [uploadFileType]="to.uploadFileType"
                       [uploadMultiple]="to.uploadMultiple"
                       [uploadContentField]="to.uploadContentField"
                       [uploadFileNameField]="to.uploadFileNameField"
                       [uploadFileVerify]="to.uploadFileVerify"
                       [uploadAdditionalFields]="to.uploadAdditionalFields"
                       [uploadMinSize]="to.uploadMinSize"
                       [uploadMaxSize]="to.uploadMaxSize"
                       [uploadImmediately]="to.uploadImmediately"
                       (uploadProgress)="to.uploadProgress && to.uploadProgress($event)"
                       (uploadDataSendProgress)="to.uploadDataSendProgress && to.uploadDataSendProgress($event)"
                       (uploadComplete)="to.uploadComplete && to.uploadComplete($event)"
                       (uploadStart)="to.uploadStart && to.uploadStart($event)"
                       (uploadChange)="to.uploadChange && to.uploadChange($event)"
        >{{to.content}}</jigsaw-button>
        <jigsaw-upload-result *ngIf="to.showUploadResult && files.length > 0" width="100%"
                              [uploader]="uploader"
                              (change)="to.resultChange && to.resultChange($event)"
                              (progress)="to.resultProgress && to.resultProgress($event)"
                              (remove)="to.resultRemove && to.resultRemove($event)">
        </jigsaw-upload-result>
    `,
    host: {
        '[style.flex]': '1',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * 上传结果的三个事件，这里在配置到 TemplateOption 里面的时候，加上前缀 result：
 * 一是为了跟 upload 指令的事件作区分
 * 二是因为，change 这个名称也是 TemplateOption 里面内置的属性名称，这里没法直接使用
 */
export class FormlyFieldUpload extends FormlyFieldType<JigsawUploadDirective> {
    defaultOptions = {
        templateOptions: {
            width: 80,
            showUploadResult: true,
            hideLabel: false,
            content: '上传',
            icon: 'iconfont iconfont-e1c8',
            colorType: ColorType.default,
            preSize: SizeType.default,
            uploadTargetUrl: '/rdk/service/common/upload',
            uploadMultiple: true,
            uploadContentField: 'file',
            uploadFileNameField: 'filename',
            uploadImmediately: true,
            uploadMaxSize: 1024,
            uploadMinSize: 0
        },
    };

    @ViewChild(JigsawUploadDirective)
    public uploader: JigsawUploadDirective;

    @ViewChild(JigsawUploadResult)
    public uploadResult: JigsawUploadResult;

    ngAfterViewInit(): void {
        this.to.componentRef = this;
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
    }
}
