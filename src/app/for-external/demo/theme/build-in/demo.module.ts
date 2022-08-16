import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMenuModule, JigsawButtonBarModule, JigsawNumericInputModule, JigsawHeaderModule, JigsawBreadcrumbModule, JigsawFishBoneModule} from "jigsaw/public_api";

import {ThemeBuildInDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        CommonModule,  JigsawMenuModule, JigsawButtonBarModule,
        JigsawNumericInputModule, JigsawHeaderModule, JigsawBreadcrumbModule, JigsawFishBoneModule
    ],
    declarations: [ThemeBuildInDemoComponent],
    exports: [ThemeBuildInDemoComponent]
})
export class ThemeBuildInDemoModule {
}
