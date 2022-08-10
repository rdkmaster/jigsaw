import {NgModule} from "@angular/core";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {
    JigsawMobileAlertModule,
    JigsawMobileButtonModule,
    PopupService,
    JigsawMobileDialogModule,
    TranslateHelper
} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {I18nFullDemoComponent} from "./demo.component";

@NgModule({
    declarations: [I18nFullDemoComponent],
    exports: [I18nFullDemoComponent],
    imports: [
        JigsawMobileAlertModule, JigsawMobileButtonModule,
        JigsawMobileDialogModule, JigsawDemoDescriptionModule,
        TranslateModule/* #for-live-demo-only# .forRoot() */
    ],
    providers: [PopupService, TranslateService]
})
export class I18nFullDemoModule {
    constructor() {
        /**
         * 覆盖控件内部的国际化词条
         */
        TranslateHelper.alert.zh = {
            button: {ok: '知道了'}
        };
        TranslateHelper.alert.en = {
            button: {ok: 'Gotcha'}
        };
    }
}
