import {NgModule} from '@angular/core';
import {JigsawLayoutModule} from "jigsaw/component/layout/layout";
import {customSceneLayoutDemoComponent} from "./app.component";
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawBoxModule} from "../../../../jigsaw/component/box/box";
import {CustomTableComponent} from "./custom-component";
import {JigsawTableModule} from "../../../../jigsaw/component/table/table";
import {BasicGraphComponent} from "../../graph/basic/app.component";
import {JigsawGraphModule} from "../../../../jigsaw/component/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableBasicDemoComponent} from "../../table/basic/app.component";

@NgModule({
    declarations: [
        customSceneLayoutDemoComponent, TableBasicDemoComponent, BasicGraphComponent
    ],
    imports: [
        JigsawLayoutModule,
        JigsawSelectModule,
        JigsawBoxModule,
        JigsawTableModule,
        JigsawGraphModule,
        JigsawDemoDescriptionModule
    ],
    exports: [customSceneLayoutDemoComponent],
    entryComponents: [TableBasicDemoComponent, BasicGraphComponent]
})
export class customSceneLayoutDemoModule {

}
