import {NgModule} from "@angular/core";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {JigsawMobileAlertModule} from "jigsaw/mobile-components/alert/alert";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {PopupService} from "jigsaw/common/service/popup.service";
import {JigsawMobileDialogModule} from "jigsaw/mobile-components/dialog/dialog";

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
