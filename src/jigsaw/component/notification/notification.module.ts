import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JigsawNotification} from './notification.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHelper} from "../../core/utils/translate-helper";
import {InternalUtils} from "../../core/utils/internal-utils";
import {JigsawButtonModule} from "../button/button";
import {JigsawAlertModule} from "../alert/alert";
import {JigsawTrustedHtmlModule} from "../../directive/trusted-html/trusted-html"

@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forRoot(),
        JigsawButtonModule,
        JigsawAlertModule,
        JigsawTrustedHtmlModule
    ],
    declarations: [JigsawNotification],
    exports: [JigsawNotification],
    entryComponents: [JigsawNotification]
})
export class JigsawNotificationModule {
    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, 'notification', {
            zh: {
                button: {
                    ok: "确定",
                    cancel: "取消",
                    yes: "是",
                    no: "否",
                    abort: "终止",
                    ignore: "忽略",
                    retry: "重试"
                },
                title: {
                    info: "提示",
                    warning: "警告",
                    error: "错误",
                    confirm: "确认"
                }
            },
            en: {
                button: {
                    ok: "OK",
                    cancel: "Cancel",
                    yes: "Yes",
                    no: "No",
                    abort: "Abort",
                    ignore: "Ignore",
                    retry: "Retry"
                },
                title: {
                    info: "Information",
                    warning: "Warning",
                    error: "Error",
                    confirm: "Confirm"
                }
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
        TranslateHelper.languageChangEvent.subscribe(langInfo => {
            translateService.use(langInfo.curLang);
        });
    }
}
