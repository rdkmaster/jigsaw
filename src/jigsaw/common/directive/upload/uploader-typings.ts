import {EventEmitter} from "@angular/core";

export type UploadingFileLog = {
    time: string,
    content: string
}

export type UploadFileInfo = {
    name: string, url: string, file: File,
    state: 'pause' | 'loading' | 'success' | 'error',
    progress?: number, log?: UploadingFileLog[], message?: string,
    // 失败原因：类型错误，大小不符合 时，不让显示重新上传，因为没有意义
    hideRetry?: boolean
}

export interface IUploader {
    files: UploadFileInfo[];
    progress: EventEmitter<UploadFileInfo>;
    dataSendProgress: EventEmitter<UploadFileInfo>;
    complete: EventEmitter<UploadFileInfo[]>;
    start: EventEmitter<UploadFileInfo[]>;

    retryUpload(file: UploadFileInfo);
}
