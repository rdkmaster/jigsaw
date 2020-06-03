import {NgModule} from "@angular/core";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {JigsawMobileAlertModule, JigsawMobileButtonModule, PopupService, JigsawMobileDialogModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
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
}
