import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PopupZIndexDemoComponent} from "./demo.component";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {JigsawDialogModule} from "jigsaw/pc-components/dialog/dialog";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawLoadingModule} from "jigsaw/common/components/loading/loading";
import {LoadingService} from "jigsaw/common/service/loading.service";
import {JigsawSelectModule} from "jigsaw/pc-components/select/select";
import {JigsawTooltipModule} from "jigsaw/pc-components/tooltip/tooltip";
import {JigsawNotificationModule} from "jigsaw/pc-components/notification/notification";
import {JigsawDrawerModule} from "jigsaw/pc-components/drawer/drawer";
import {CommonModule} from "@angular/common";
import {JigsawDateTimePickerModule} from "jigsaw/pc-components/date-and-time/date-time-picker";
import {JigsawRangeDateTimePickerModule} from "jigsaw/pc-components/date-and-time/range-date-time-picker";

@NgModule({
    declarations: [PopupZIndexDemoComponent],
    exports: [PopupZIndexDemoComponent],
    imports: [JigsawDateTimePickerModule, JigsawRangeDateTimePickerModule, JigsawComboSelectModule, JigsawDialogModule,
        JigsawSelectModule, JigsawLoadingModule, JigsawButtonModule, JigsawDemoDescriptionModule,
        JigsawTooltipModule, JigsawNotificationModule, JigsawDrawerModule, CommonModule],
    providers: [LoadingService]
})
export class PopupZIndexDemoModule {

}
