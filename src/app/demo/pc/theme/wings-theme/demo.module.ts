import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawSwitchModule, JigsawListModule, JigsawMenuModule, JigsawButtonBarModule, JigsawNumericInputModule, JigsawHeaderModule, JigsawBreadcrumbModule, JigsawFishBoneModule, JigsawButtonModule, JigsawSelectModule, JigsawTagModule, JigsawInputModule, JigsawAutoCompleteInputModule, JigsawCheckBoxModule, JigsawRadioModule, JigsawRadioLiteModule, JigsawListLiteModule, JigsawLoadingModule, JigsawCollapseModule, JigsawTileLiteModule, JigsawTileSelectModule, JigsawComboSelectModule, JigsawIconModule, JigsawSearchInputModule, JigsawTextareaModule, JigsawSliderModule, JigsawDatePickerModule, JigsawDateTimePickerModule, JigsawTimePickerModule, JigsawDateTimeSelectModule, JigsawRangeDateTimePickerModule, JigsawRangeDateTimeSelectModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { ThemeBuildInThemeDemoComponent } from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        JigsawButtonModule,
        JigsawSelectModule,
        JigsawTagModule,
        JigsawInputModule,
        JigsawNumericInputModule,
        JigsawAutoCompleteInputModule,
        JigsawBreadcrumbModule,
        JigsawCheckBoxModule,
        JigsawRadioModule,
        JigsawRadioLiteModule,
        JigsawListModule,
        JigsawListLiteModule,
        JigsawLoadingModule,
        JigsawCollapseModule,
        JigsawTileLiteModule,
        JigsawTileSelectModule,
        JigsawSwitchModule,
        JigsawButtonBarModule,
        JigsawComboSelectModule,
        JigsawIconModule,
        JigsawSearchInputModule,
        JigsawTextareaModule,
        JigsawSliderModule,
        JigsawDatePickerModule,
        JigsawDateTimePickerModule,
        JigsawTimePickerModule,
        JigsawDateTimeSelectModule,
        JigsawRangeDateTimePickerModule,
        JigsawRangeDateTimeSelectModule
    ],
    declarations: [ThemeBuildInThemeDemoComponent],
    exports: [ThemeBuildInThemeDemoComponent]
})
export class ThemeBuildInThemeDemoModule {
}
