import {NgModule} from '@angular/core';
import {JigsawViewEditorModule} from "jigsaw/component/view-editor/view-editor";
import {customSceneLayoutDemoComponent} from "./demo.component";
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {BasicGraphComponent} from "../../graph/basic/demo.component";
import {TableBasicDemoComponent} from "../../table/basic/demo.component";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {CommonModule} from "@angular/common";
import {TableBasicDemoModule} from "../../table/basic/demo.module";
import {BasicGraphModule} from "../../graph/basic/demo.module";

@NgModule({
    declarations: [
        customSceneLayoutDemoComponent
    ],
    imports: [
        JigsawViewEditorModule,
        JigsawSelectModule,
        JigsawDialogModule,
        JigsawRadioModule,
        CommonModule,
        // 可选的内容模块
        TableBasicDemoModule,
        BasicGraphModule,
    ],
    exports: [customSceneLayoutDemoComponent],
    entryComponents: [TableBasicDemoComponent, BasicGraphComponent] // 可选的内容组件
})
export class customSceneLayoutDemoModule {

}
