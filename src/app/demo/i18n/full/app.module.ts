import {NgModule} from "@angular/core";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {JigsawAlertModule} from "jigsaw/component/alert/alert";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {PopupService} from "jigsaw/service/popup.service";
import {JigsawTimeModule} from "jigsaw/component/time/index";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {TranslateHelper} from "jigsaw/core/utils/translate-helper";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";

import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {I18nFullDemoComponent} from "./app.component";

/**
 * 覆盖控件内部的国际化词条
 */
TranslateHelper.alert.zh = {
    button: {ok: '知道了'}
};
TranslateHelper.alert.en = {
    button: {ok: 'Gotcha'}
};

@NgModule({
    declarations: [I18nFullDemoComponent],
    bootstrap: [I18nFullDemoComponent],
    imports: [
        JigsawAlertModule, JigsawButtonModule, JigsawTimeModule, JigsawRangeTimeModule,
        JigsawDialogModule, JigsawDemoDescriptionModule,
        TranslateModule/* #for-live-demo-only# .forRoot() */
    ],
    providers: [PopupService, TranslateService]
})
export class I18nFullDemoModule {
    constructor(ts: TranslateService) {
        //增加自定义词条，最后一个参数必须是true
        ts.setTranslation('zh', {
            desc: '这是一个用于演示在Jigsaw如何使用国际化的完整例子。',
            lang: '当前语言是 <b>{{lang}}</b>',
            alertText: '这是一个非常棒的 info 提示框！',
            dialogButtonConfirm: '确认',
            dialogButtonCancel: '退出',
            dialogTitle: '创建任务',
            dialogContent: '创建任务成功',
        }, true);
        ts.setTranslation('en', {
            desc: 'A complete example shows how to use i18n with Jigsaw.',
            lang: 'The current language is <b>{{lang}}</b>',
            alertText: 'This is a great info alert!',
            dialogButtonConfirm: 'Confirm',
            dialogButtonCancel: 'Cancel',
            dialogTitle: 'Create Task',
            dialogContent: 'Create task success',
        }, true);
    }
}
