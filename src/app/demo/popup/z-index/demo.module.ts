import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PopupZIndexDemoComponent} from "./demo.component";
import {JigsawTimeModule} from "jigsaw/component/time/index";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {LoadingService} from "jigsaw/service/loading.service";
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawTooltipModule} from "jigsaw/component/tooltip/tooltip";
import {JigsawNotificationModule} from "jigsaw/component/notification/notification";
import {JigsawDrawerModule} from "jigsaw/component/drawer/drawer";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [PopupZIndexDemoComponent],
    exports: [PopupZIndexDemoComponent],
    imports: [JigsawTimeModule, JigsawRangeTimeModule, JigsawComboSelectModule, JigsawDialogModule,
        JigsawSelectModule, JigsawLoadingModule, JigsawButtonModule, JigsawDemoDescriptionModule,
        JigsawTooltipModule, JigsawNotificationModule, JigsawDrawerModule, CommonModule],
    providers: [LoadingService]
})
export class PopupZIndexDemoModule {

}
