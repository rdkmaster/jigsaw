import {NgModule} from '@angular/core';
import {EditableDemoComponent} from "./demo.component";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {JigsawBoxModule} from "../../../../jigsaw/component/box/index";

@NgModule({
    declarations: [
        EditableDemoComponent
    ],
    imports: [
        JigsawBoxModule,
        JigsawButtonModule
    ],
    exports: [EditableDemoComponent],
})
export class EditableDemoModule {

}
