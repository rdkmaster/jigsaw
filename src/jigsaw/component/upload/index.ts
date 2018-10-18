import {TranslateService, TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawBoxModule} from "../box";
import {JigsawButtonModule} from "../button/button";
import {JigsawDraggableModule, JigsawDroppableModule} from "../../directive/dragdrop";
import {JigsawUploadFileInfoList, JigsawUploadDirective} from "./upload.directive";
import {JigsawUpload} from "./upload";
import {PopupService} from "../../service/popup.service";
import {InternalUtils} from "../../core/utils/internal-utils";
import {TranslateHelper} from "../../core/utils/translate-helper";

@NgModule({
    imports: [
        JigsawBoxModule, JigsawButtonModule, PerfectScrollbarModule, JigsawDraggableModule, TranslateModule.forRoot(),
        JigsawDroppableModule, CommonModule, FormsModule
    ],
    declarations: [JigsawUpload, JigsawUploadDirective, JigsawUploadFileInfoList],
    exports: [JigsawUpload, JigsawUploadDirective],
    entryComponents: [JigsawUploadFileInfoList],
    providers: [PopupService, TranslateService],
})
export class JigsawUploadModule {
    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, 'upload', {
            zh: {
                "Bad Request": "错误请求",
                "Unauthorized": "未授权",
                "Payment Required": "需要支付",
                "Forbidden": "禁止",
                "Not Found": "未找到",
                "Method Not Allowed": "方法禁用",
                "Not Acceptable": "不接受",
                "Proxy Authentication Required": "需要代理授权",
                "Request Timeout": "请求超时",
                "Conflict": "冲突",
                "Gone": "已删除",
                "Length Required": "需要有效长度",
                "Precondition Failed": "未满足前提条件",
                "Request Entity Too Large": "请求实体过大",
                "Request-URI Too Long": "请求的 URI 过长",
                "Unsupported Media Type": "不支持的媒体类型",
                "Requested Range Not Satisfiable": "请求范围不符合要求",
                "Expectation Failed": "未满足期望值",
                "Authentication Timeout": "授权超时",
                "Unprocessable Entity": "不可处理的请求实体",
                "Locked": "锁定",
                "Failed Dependency": "错误的依赖关系",
                "Upgrade Required": "需要更新",
                "Precondition Required": "需要前提条件",
                "Too Many Requests": "请求过多",
                "Login Timeout": "登陆超时",
                "No Response": "没有回应",
                "Retry With;": "请重试",
                "Request Header Too Large": "请求头部过大",
                "Cert Error": "证书错误",
                "No Cert": "无证书",
                "HTTP to HTTPS": "需要把http换为https",
                "Client Closed Request": "客户端关闭了请求",
                "Internal Server Error": "服务器内部错误",
                "Not Implemented": "尚未实施",
                "Bad Gateway": "错误网关",
                "Service Unavailable": "服务不可用",
                "Gateway Timeout": "网关超时",
                "HTTP Version Not Supported": "HTTP 版本不受支持",
                "Variant Also Negotiates": "变元协商",
                "Insufficient Storage": "储存空间不足",
                "Loop Detected": "检测到循环",
                "Bandwidth Limit Exceeded": "超过带宽限制",
                "Not Extended": "非扩展",
                "Network Authentication Required": "需要网络授权",
                "Network read timeout error": "网络读取超时错误",
                "Network connect timeout error": "网络连接超时错误"
            },
            en: {
                "Bad Request": "Bad Request",
                "Unauthorized": "Unauthorized",
                "Payment Required": "Payment Required",
                "Forbidden": "Forbidden",
                "Not Found": "Not Found",
                "Method Not Allowed": "Method Not Allowed",
                "Not Acceptable": "Not Acceptable",
                "Proxy Authentication Required": "Proxy Authentication Required",
                "Request Timeout": "Request Timeout",
                "Conflict": "Conflict",
                "Gone": "Gone",
                "Length Required": "Length Required",
                "Precondition Failed": "Precondition Failed",
                "Request Entity Too Large": "Request Entity Too Large",
                "Request-URI Too Long": "Request-URI Too Long",
                "Unsupported Media Type": "Unsupported Media Type",
                "Requested Range Not Satisfiable": "Requested Range Not Satisfiable",
                "Expectation Failed": "Expectation Failed",
                "Authentication Timeout": "Authentication Timeout",
                "Unprocessable Entity": "Unprocessable Entity",
                "Locked": "Locked",
                "Failed Dependency": "Failed Dependency",
                "Upgrade Required": "Upgrade Required",
                "Precondition Required": "Precondition Required",
                "Too Many Requests": "Too Many Requests",
                "Login Timeout": "Login Timeout",
                "No Response": "No Response",
                "Retry With": "Retry With",
                "Request Header Too Large": "Request Header Too Large",
                "Cert Error": "Cert Error",
                "No Cert": "No Cert",
                "HTTP to HTTPS": "HTTP to HTTPS",
                "Client Closed Request": "Client Closed Request",
                "Internal Server Error": "Internal Server Error",
                "Not Implemented": "Not Implemented",
                "Bad Gateway": "Bad Gateway",
                "Service Unavailable": "Service Unavailable",
                "Gateway Timeout": "Gateway Timeout",
                "HTTP Version Not Supported": "HTTP Version Not Supported",
                "Variant Also Negotiates": "Variant Also Negotiates",
                "Insufficient Storage": "Insufficient Storage",
                "Loop Detected": "Loop Detected",
                "Bandwidth Limit Exceeded": "Bandwidth Limit Exceeded",
                "Not Extended": "Not Extended",
                "Network Authentication Required": "Network Authentication Required",
                "Network read timeout error": "Network read timeout error",
                "Network connect timeout error": "Network connect timeout error"
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
        TranslateHelper.languageChangEvent.subscribe(langInfo => {
            translateService.use(langInfo.curLang);
        });
    }
}

export * from './upload';
export * from './upload.base';
export * from './upload.directive';
