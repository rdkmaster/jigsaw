import {NgModule} from "@angular/core";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {JigsawAlertModule} from "jigsaw/pc-components/alert/alert";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {PopupService} from "jigsaw/common/service/popup.service";
import {JigsawTimeModule} from "jigsaw/pc-components/time/index";
import {JigsawRangeTimeModule} from "jigsaw/pc-components/range-time/index";
import {JigsawDialogModule} from "jigsaw/pc-components/dialog/dialog";
import {JigsawPaginationModule} from "jigsaw/pc-components/pagination/pagination";

import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {I18nFullDemoComponent} from "./demo.component";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select";


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
