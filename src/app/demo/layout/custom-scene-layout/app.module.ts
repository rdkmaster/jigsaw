import {NgModule} from '@angular/core';
import {JigsawLayoutModule} from "jigsaw/component/layout/layout";
import {customSceneLayoutDemoComponent} from "./app.component";
import {JigsawSelectModule} from "jigsaw/component/select/select";

@NgModule({
    declarations: [
        customSceneLayoutDemoComponent
    ],
    imports: [
        JigsawLayoutModule, JigsawSelectModule,
    ],
    exports: [customSceneLayoutDemoComponent]
})
export class customSceneLayoutDemoModule {

}
