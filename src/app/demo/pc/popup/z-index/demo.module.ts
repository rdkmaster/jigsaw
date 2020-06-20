import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawComboSelectModule, JigsawDialogModule, JigsawButtonModule, JigsawLoadingModule,
    LoadingService, JigsawDateTimePickerModule, JigsawSelectModule,
    JigsawNotificationModule, JigsawRangeDateTimePickerModule, JigsawDrawerModule,
    JigsawTooltipModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PopupZIndexDemoComponent} from "./demo.component";

@NgModule({
    declarations: [PopupZIndexDemoComponent],
    exports: [PopupZIndexDemoComponent],
    imports: [
        JigsawDateTimePickerModule, JigsawRangeDateTimePickerModule, JigsawComboSelectModule,
        JigsawDialogModule, JigsawSelectModule, JigsawLoadingModule, JigsawButtonModule,
        JigsawDemoDescriptionModule, JigsawNotificationModule, JigsawDrawerModule,
        CommonModule, JigsawTooltipModule
    ],
    providers: [LoadingService]
})
export class PopupZIndexDemoModule {
}
