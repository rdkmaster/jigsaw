import {NgModule} from '@angular/core';
import {EditableAndBlockedDemoComponent} from "./demo.component";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {JigsawBoxModule} from "../../../../jigsaw/component/box/index";

@NgModule({
    declarations: [
        EditableAndBlockedDemoComponent
    ],
    imports: [
        JigsawBoxModule,
        JigsawButtonModule
    ],
    exports: [EditableAndBlockedDemoComponent],
})
export class EditableAndBlockedDemoModule {

}
