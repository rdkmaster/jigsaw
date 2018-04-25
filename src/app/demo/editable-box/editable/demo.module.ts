import {NgModule} from '@angular/core';
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawBoxModule} from "jigsaw/component/box/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {EditableDemoComponent} from "./demo.component";

@NgModule({
    declarations: [
        EditableDemoComponent
    ],
    imports: [
        JigsawBoxModule,
        JigsawButtonModule,
        JigsawDemoDescriptionModule
    ],
    exports: [EditableDemoComponent],
})
export class EditableDemoModule {

}
