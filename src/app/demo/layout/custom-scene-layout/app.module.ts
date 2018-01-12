import {NgModule} from '@angular/core';
import {JigsawViewEditorModule} from "jigsaw/component/layout/layout";
import {customSceneLayoutDemoComponent} from "./app.component";
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawBoxModule} from "../../../../jigsaw/component/box/box";
import {BasicGraphComponent} from "../../graph/basic/app.component";
import {TableBasicDemoComponent} from "../../table/basic/app.component";
import {JigsawDialogModule} from "../../../../jigsaw/component/dialog/dialog";
import {JigsawRadioModule} from "../../../../jigsaw/component/radio/radio";
import {CommonModule} from "@angular/common";
import {TableBasicDemoModule} from "../../table/basic/app.module";
import {BasicGraphModule} from "../../graph/basic/app.module";

@NgModule({
    declarations: [
        customSceneLayoutDemoComponent
    ],
    imports: [
        JigsawViewEditorModule,
        JigsawSelectModule,
        JigsawBoxModule,
        TableBasicDemoModule,
        BasicGraphModule,
        JigsawDialogModule,
        JigsawRadioModule,
        CommonModule
    ],
    exports: [customSceneLayoutDemoComponent],
    entryComponents: [TableBasicDemoComponent, BasicGraphComponent]
})
export class customSceneLayoutDemoModule {

}
