import {NgModule} from '@angular/core';
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawBoxModule} from "jigsaw/pc-components/box/index";
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
