import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawUploadDirective} from "../../common/directive/upload/upload.directive";
import {PopupService} from "../../common/service/popup.service";
import {TranslateHelper} from "../../common/core/utils/translate-helper";
import { JigsawUploadResult } from './upload-result';
import { JigsawCollapseModule } from '../collapse/collapse';
import { JigsawProgressModule } from '../progress/progress';
import {JigsawLoadingModule} from "../../common/components/loading/loading";
import { JigsawTooltipModule } from '../../common/directive/tooltip/tooltip';
import { JigsawUpload } from './upload';
import { JigsawDroppableModule, JigsawDraggableModule } from '../../common/directive/dragdrop/index';

@NgModule({
    imports: [
        PerfectScrollbarModule, JigsawTooltipModule, CommonModule, JigsawCollapseModule,
        JigsawProgressModule, JigsawLoadingModule, JigsawDraggableModule,
        JigsawDroppableModule, TranslateModule.forChild(),
    ],
    declarations: [JigsawUploadDirective, JigsawUploadResult, JigsawUpload],
    exports: [JigsawUploadDirective, JigsawUploadResult, JigsawUpload],
    providers: [PopupService],
})
export class JigsawUploadModule {
    constructor() {
        TranslateHelper.initI18n('upload', {
            zh: {
                "waiting": "等待中",
                "uploading": "上传中",
                "done": "上传成功",
                "failed": "上传失败",
                "retry": "重新上传",
                "unknownStatus": "未知状态",

                "Bad Request": "错误详情：错误请求",
                "Unauthorized": "错误详情：未授权",
                "Payment Required": "错误详情：需要支付",
                "Forbidden": "错误详情：禁止",
                "Not Found": "错误详情：未找到",
                "Method Not Allowed": "错误详情：方法禁用",
                "Not Acceptable": "错误详情：不接受",
                "Proxy Authentication Required": "错误详情：需要代理授权",
                "Request Timeout": "错误详情：请求超时",
                "Conflict": "错误详情：冲突",
                "Gone": "错误详情：已删除",
                "Length Required": "错误详情：需要有效长度",
                "Precondition Failed": "错误详情：未满足前提条件",
                "Request Entity Too Large": "错误详情：请求实体过大",
                "Request-URI Too Long": "错误详情：请求的 URI 过长",
                "Unsupported Media Type": "错误详情：不支持的媒体类型",
                "Requested Range Not Satisfiable": "错误详情：请求范围不符合要求",
                "Expectation Failed": "错误详情：未满足期望值",
                "Authentication Timeout": "错误详情：授权超时",
                "Unprocessable Entity": "错误详情：不可处理的请求实体",
                "Locked": "错误详情：锁定",
                "Failed Dependency": "错误详情：错误的依赖关系",
                "Upgrade Required": "错误详情：需要更新",
                "Precondition Required": "错误详情：需要前提条件",
                "Too Many Requests": "错误详情：请求过多",
                "Login Timeout": "错误详情：登陆超时",
                "No Response": "错误详情：没有回应",
                "Retry With;": "错误详情：请重试",
                "Request Header Too Large": "错误详情：请求头部过大",
                "Cert Error": "错误详情：证书错误",
                "No Cert": "错误详情：无证书",
                "HTTP to HTTPS": "错误详情：需要把http换为https",
                "Client Closed Request": "错误详情：客户端关闭了请求",
                "Internal Server Error": "错误详情：服务器内部错误",
                "Not Implemented": "错误详情：尚未实施",
                "Bad Gateway": "错误详情：错误网关",
                "Service Unavailable": "错误详情：服务不可用",
                "Gateway Timeout": "错误详情：网关超时",
                "HTTP Version Not Supported": "错误详情：HTTP 版本不受支持",
                "Variant Also Negotiates": "错误详情：变元协商",
                "Insufficient Storage": "错误详情：储存空间不足",
                "Loop Detected": "错误详情：检测到循环",
                "Bandwidth Limit Exceeded": "错误详情：超过带宽限制",
                "Not Extended": "错误详情：非扩展",
                "Network Authentication Required": "错误详情：需要网络授权",
                "Network read timeout error": "错误详情：网络读取超时错误",
                "Network connect timeout error": "错误详情：网络连接超时错误",
                "fileTypeError": "错误详情：文件类型错误",
                "fileMinSizeError": "错误详情：文件尺寸小于最小限制",
                "fileMaxSizeError": "错误详情：文件尺寸大于最大限制",

                "select": "选择",
                "singleFile": "或拖入文件，限单个文件。",
                "multipleFiles": "或拖入文件，支持多个文件。",
                "acceptAllTypes": "支持所有类型的文件",
                "acceptSpecificTypes": "仅支持 {{ file }} 类型的文件"
            },
            en: {
                "waiting": "Waiting",
                "uploading": "Uploading",
                "done": "Success to upload",
                "failed": "Failed to upload",
                "retry": "Retry",
                "unknownStatus": "Unknown status",

                "Bad Request": "Error detail: Bad Request",
                "Unauthorized": "Error detail: Unauthorized",
                "Payment Required": "Error detail: Payment Required",
                "Forbidden": "Error detail: Forbidden",
                "Not Found": "Error detail: Not Found",
                "Method Not Allowed": "Error detail: Method Not Allowed",
                "Not Acceptable": "Error detail: Not Acceptable",
                "Proxy Authentication Required": "Error detail: Proxy Authentication Required",
                "Request Timeout": "Error detail: Request Timeout",
                "Conflict": "Error detail: Conflict",
                "Gone": "Error detail: Gone",
                "Length Required": "Error detail: Length Required",
                "Precondition Failed": "Error detail: Precondition Failed",
                "Request Entity Too Large": "Error detail: Request Entity Too Large",
                "Request-URI Too Long": "Error detail: Request-URI Too Long",
                "Unsupported Media Type": "Error detail: Unsupported Media Type",
                "Requested Range Not Satisfiable": "Error detail: Requested Range Not Satisfiable",
                "Expectation Failed": "Error detail: Expectation Failed",
                "Authentication Timeout": "Error detail: Authentication Timeout",
                "Unprocessable Entity": "Error detail: Unprocessable Entity",
                "Locked": "Error detail: Locked",
                "Failed Dependency": "Error detail: Failed Dependency",
                "Upgrade Required": "Error detail: Upgrade Required",
                "Precondition Required": "Error detail: Precondition Required",
                "Too Many Requests": "Error detail: Too Many Requests",
                "Login Timeout": "Error detail: Login Timeout",
                "No Response": "Error detail: No Response",
                "Retry With": "Error detail: Retry With",
                "Request Header Too Large": "Error detail: Request Header Too Large",
                "Cert Error": "Error detail: Cert Error",
                "No Cert": "Error detail: No Cert",
                "HTTP to HTTPS": "Error detail: HTTP to HTTPS",
                "Client Closed Request": "Error detail: Client Closed Request",
                "Internal Server Error": "Error detail: Internal Server Error",
                "Not Implemented": "Error detail: Not Implemented",
                "Bad Gateway": "Error detail: Bad Gateway",
                "Service Unavailable": "Error detail: Service Unavailable",
                "Gateway Timeout": "Error detail: Gateway Timeout",
                "HTTP Version Not Supported": "Error detail: HTTP Version Not Supported",
                "Variant Also Negotiates": "Error detail: Variant Also Negotiates",
                "Insufficient Storage": "Error detail: Insufficient Storage",
                "Loop Detected": "Error detail: Loop Detected",
                "Bandwidth Limit Exceeded": "Error detail: Bandwidth Limit Exceeded",
                "Not Extended": "Error detail: Not Extended",
                "Network Authentication Required": "Error detail: Network Authentication Required",
                "Network read timeout error": "Error detail: Network read timeout error",
                "Network connect timeout error": "Error detail: Network connect timeout error",
                "fileTypeError": "Error detail: File type error",
                "fileMinSizeError": "Error detail: Size of the file is less than the minSize",
                "fileMaxSizeError": "Error detail: Size of the file is more than the maxSize",

                "select": "Select",
                "singleFile": " or drop file here, single file accepted.",
                "multipleFiles": " or drop files here, multiple files accepted.",
                "acceptAllTypes": "Accept all types of files",
                "acceptSpecificTypes": "Accept {{ file }} files only"
            }
        });
    }
}

export * from '../../common/directive/upload/upload.directive';
export * from '../../common/directive/upload/uploader-typings';
export * from './upload'
export * from './upload-result';
