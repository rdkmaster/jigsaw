import {NgModule} from "@angular/core";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {JigsawAlertModule} from "jigsaw/component/alert/alert";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {PopupService} from "jigsaw/service/popup.service";
import {JigsawTimeModule} from "jigsaw/component/time/index";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";

import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {I18nFullDemoComponent} from "./app.component";
import {JigsawPaginationModule} from "jigsaw/component/pagination/pagination";


@NgModule({
    declarations: [I18nFullDemoComponent],
    exports: [I18nFullDemoComponent],
    imports: [
        JigsawAlertModule, JigsawButtonModule, JigsawTimeModule, JigsawRangeTimeModule,
        JigsawDialogModule, JigsawDemoDescriptionModule, JigsawPaginationModule,
        TranslateModule/* #for-live-demo-only# .forRoot() */
    ],
    providers: [PopupService, TranslateService]
})
export class I18nFullDemoModule {
}
