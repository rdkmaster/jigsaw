import {NgModule} from '@angular/core';
import {CustomSceneLayoutDemoComponent} from "./demo.component";
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {CommonModule} from "@angular/common";
import {CustomTableComponent} from "./custom-table/demo.component";
import {CustomTableModule} from "./custom-table/demo.module";
import {CustomGraphComponent} from "./custom-graph/demo.component";
import {CustomGraphModule} from "./custom-graph/demo.module";
import {JigsawBoxModule} from "../../../../jigsaw/component/box/index";

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
        // 可选的内容模块
        CustomTableModule,
        CustomGraphModule,
    ],
    exports: [CustomSceneLayoutDemoComponent],
    entryComponents: [CustomTableComponent, CustomGraphComponent] // 可选的内容组件
})
export class CustomSceneLayoutDemoModule {

}
