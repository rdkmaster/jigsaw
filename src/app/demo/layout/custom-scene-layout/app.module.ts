import {NgModule} from '@angular/core';
import {JigsawLayoutModule} from "jigsaw/component/layout/layout";
import {customSceneLayoutDemoComponent} from "./app.component";
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawDemoDescriptionModule} from "../../../demo-description/demo-description";

@NgModule({
    declarations: [
        customSceneLayoutDemoComponent
    ],
    imports: [
        JigsawLayoutModule, JigsawSelectModule, JigsawDemoDescriptionModule
    ],
    exports: [customSceneLayoutDemoComponent]
})
export class customSceneLayoutDemoModule {

}
