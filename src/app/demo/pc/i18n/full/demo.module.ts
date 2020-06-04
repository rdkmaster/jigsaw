import {NgModule} from "@angular/core";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {
    JigsawAlertModule, JigsawButtonModule, PopupService, JigsawTimeModule,
    JigsawRangeTimeModule, JigsawDialogModule, JigsawPaginationModule,
    JigsawComboSelectModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {I18nFullDemoComponent} from "./demo.component";

@NgModule({
    declarations: [I18nFullDemoComponent],
    exports: [I18nFullDemoComponent],
    imports: [
        JigsawAlertModule, JigsawButtonModule, JigsawTimeModule, JigsawRangeTimeModule,
        JigsawDialogModule, JigsawDemoDescriptionModule, JigsawPaginationModule, JigsawComboSelectModule,
        TranslateModule/* #for-live-demo-only# .forRoot() */
    ],
    providers: [PopupService, TranslateService]
})
export class I18nFullDemoModule {
}
