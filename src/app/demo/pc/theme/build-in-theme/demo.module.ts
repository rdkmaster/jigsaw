import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawMenuModule, JigsawButtonBarModule, JigsawNumericInputModule, JigsawHeaderModule, JigsawBreadcrumbModule, JigsawFishBoneModule, JigsawButtonModule, JigsawSelectModule, JigsawTagModule, JigsawInputModule, JigsawAutoCompleteInputModule, JigsawCheckBoxModule, JigsawRadioModule, JigsawRadioLiteModule } from "jigsaw/public_api";
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
        JigsawRadioLiteModule
    ],
    declarations: [ThemeBuildInThemeDemoComponent],
    exports: [ThemeBuildInThemeDemoComponent]
})
export class ThemeBuildInThemeDemoModule {
}
