import {NgModule} from '@angular/core';
import {JigsawLayoutModule} from "jigsaw/component/layout/layout";
import {customSceneLayoutDemoComponent} from "./app.component";
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawBoxModule} from "../../../../jigsaw/component/box/box";

@NgModule({
    declarations: [
        customSceneLayoutDemoComponent
    ],
    imports: [
        JigsawLayoutModule, JigsawSelectModule, JigsawBoxModule
    ],
    exports: [customSceneLayoutDemoComponent]
})
export class customSceneLayoutDemoModule {

}
