import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawTimeModule, JigsawComboSelectModule, JigsawDialogModule, JigsawButtonModule,
    JigsawRangeTimeModule, JigsawLoadingModule, LoadingService,
    JigsawSelectModule, JigsawTooltipModule, JigsawNotificationModule,
    JigsawDrawerModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PopupZIndexDemoComponent} from "./demo.component";

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
