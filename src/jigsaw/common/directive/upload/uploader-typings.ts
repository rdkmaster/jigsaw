import {EventEmitter} from "@angular/core";

export type UploadingFileLog = {
    time: string,
    content: string
}

export type UploadFileInfo = {
    name: string, url: string, file?: File, formData?: FormData,
    state: 'pause' | 'loading' | 'success' | 'error',
    progress?: number, log?: UploadingFileLog[], message?: string,
    errorType?: "fileTypeError" | "fileMinSizeError" | "fileMaxSizeError"
}

export interface IUploader {
    files: UploadFileInfo[];
    progress: EventEmitter<UploadFileInfo>;
    dataSendProgress: EventEmitter<UploadFileInfo>;
    complete: EventEmitter<UploadFileInfo[]>;
    start: EventEmitter<UploadFileInfo[]>;
    change: EventEmitter<UploadFileInfo[]>;
    uploadImmediately: boolean;
    upload();
    appendFiles(fileList);
    retryUpload(file: UploadFileInfo);
}
