import {NgModule} from '@angular/core';
import {JigsawViewEditorModule} from "jigsaw/component/view-editor/view-editor";
import {EditableAndBlockedDemoComponent} from "./demo.component";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";

@NgModule({
    declarations: [
        EditableAndBlockedDemoComponent
    ],
    imports: [
        JigsawViewEditorModule,
        JigsawButtonModule
    ],
    exports: [EditableAndBlockedDemoComponent],
})
export class EditableAndBlockedDemoModule {

}
