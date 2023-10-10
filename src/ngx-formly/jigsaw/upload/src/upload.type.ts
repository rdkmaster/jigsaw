import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {ColorType, SizeType} from "@ngx-formly/jigsaw/button";
import {FormlyUploadComponent} from "./upload.component";

@Component({
    selector: 'formly-field-jigsaw-upload',
    template: `
        <formly-jigsaw-upload
            [formControl]="formControl"
            [formlyAttributes]="field"
            [width]="to.width"
            [height]="to.height"
            [showUploadResult]="to.showUploadResult"
            [clearable]="to.clearable"
            [valid]="to.valid"
            [disabled]="to.disabled"
            [colorType]="to.colorType"
            [preSize]="to.preSize"
            [icon]="to.icon"
            [content]="to.content"
            [theme]="to.theme"
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
            (resultChange)="to.resultChange && to.resultChange($event)"
            (resultProgress)="to.resultProgress && to.resultProgress($event)"
            (resultRemove)="to.resultRemove && to.resultRemove($event)"
        ></formly-jigsaw-upload>
    `,
    host: {
        '[style.flex]': '1',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FormlyFieldUpload extends FormlyFieldType<FormlyUploadComponent> {
    defaultOptions = {
        templateOptions: {
            hideLabel: false,
            content: '上传',
            showUploadResult: true,
            clearable: true,
            valid: true,
            icon: 'iconfont iconfont-e015',
            colorType: ColorType.default,
            preSize: SizeType.default,
            uploadTargetUrl: '/rdk/service/common/upload',
            uploadMultiple: true,
            uploadContentField: 'file',
            uploadFileNameField: 'filename',
            uploadImmediately: false,
            uploadMaxSize: 1024,
            uploadMinSize: 0
        },
    };

    @ViewChild(FormlyUploadComponent)
    protected _instance: FormlyUploadComponent;
}
