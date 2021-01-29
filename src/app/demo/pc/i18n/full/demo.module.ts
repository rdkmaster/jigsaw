import {NgModule} from "@angular/core";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {
    JigsawAlertModule, JigsawButtonModule, PopupService, JigsawDialogModule,
    JigsawPaginationModule, JigsawComboSelectModule, JigsawDateTimePickerModule,
    JigsawRangeDateTimePickerModule, TranslateHelper
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {I18nFullDemoComponent} from "./demo.component";

@NgModule({
    declarations: [I18nFullDemoComponent],
    exports: [I18nFullDemoComponent],
    imports: [
        JigsawAlertModule, JigsawButtonModule, JigsawDateTimePickerModule, JigsawRangeDateTimePickerModule,
        JigsawDialogModule, JigsawDemoDescriptionModule, JigsawPaginationModule, JigsawComboSelectModule,
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
