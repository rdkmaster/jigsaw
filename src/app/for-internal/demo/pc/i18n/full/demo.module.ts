import {NgModule} from "@angular/core";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {
    JigsawAlertModule, JigsawButtonModule, PopupService, JigsawDialogModule,
    JigsawPaginationModule, JigsawComboSelectModule, JigsawDateTimePickerModule,
    JigsawRangeDateTimePickerModule, JigsawMenuModule, JigsawSelectModule, JigsawTabsModule,
    JigsawTableModule, JigsawInputModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {I18nFullDemoComponent} from "./demo.component";

@NgModule({
    declarations: [I18nFullDemoComponent],
    exports: [I18nFullDemoComponent],
    imports: [
        JigsawAlertModule, JigsawButtonModule, JigsawDateTimePickerModule, JigsawRangeDateTimePickerModule,
        JigsawDialogModule, JigsawDemoDescriptionModule, JigsawPaginationModule, JigsawComboSelectModule,
        JigsawMenuModule, JigsawSelectModule, TranslateModule, JigsawTabsModule, JigsawTableModule,
        JigsawInputModule/* #for-live-demo-only# .forRoot() */
    ],
    providers: [PopupService, TranslateService]
})
export class I18nFullDemoModule {
}
