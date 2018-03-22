import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawBoxModule} from "jigsaw/component/box/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CustomTableComponent} from "./custom-table/demo.component";
import {CustomTableModule} from "./custom-table/demo.module";
import {CustomGraphComponent} from "./custom-graph/demo.component";
import {CustomGraphModule} from "./custom-graph/demo.module";
import {CustomSceneLayoutDemoComponent} from "./demo.component";
import {CustomTabModule} from "./custom-tab/demo.module";
import {CustomTabComponent} from "./custom-tab/demo.component";

@NgModule({
    declarations: [
        CustomSceneLayoutDemoComponent
    ],
    imports: [
        JigsawBoxModule,
        JigsawSelectModule,
        JigsawDialogModule,
        JigsawRadioModule,
        CommonModule,
        JigsawDemoDescriptionModule,
        // 可选的内容模块
        CustomTableModule,
        CustomGraphModule,
        CustomTabModule,
    ],
    exports: [CustomSceneLayoutDemoComponent],
    entryComponents: [CustomTableComponent, CustomGraphComponent, CustomTabComponent] // 可选的内容组件
})
export class CustomSceneLayoutDemoModule {

}
