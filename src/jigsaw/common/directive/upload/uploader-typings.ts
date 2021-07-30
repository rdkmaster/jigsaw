import {EventEmitter} from "@angular/core";

export type UploadingFileLog = {
    time: string,
    content: string
}

export type UploadFileInfo = {
    name: string, url: string, file: File,
    state: 'pause' | 'loading' | 'success' | 'error',
    progress?: number, log?: UploadingFileLog[], message?: string
}

export interface IUploader {
    files: UploadFileInfo[];
    progress: EventEmitter<UploadFileInfo>;
    dataSendProgress: EventEmitter<UploadFileInfo>;
    complete: EventEmitter<UploadFileInfo[]>;
    start: EventEmitter<UploadFileInfo[]>;
    autoUpload: boolean;
    _$upload();

    retryUpload(file: UploadFileInfo);
}
