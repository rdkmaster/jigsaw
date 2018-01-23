import {NgModule} from '@angular/core';
import {JigsawViewEditorModule} from "jigsaw/component/view-editor/view-editor";
import {SetResizeLineWidthDemoComponent} from "./demo.component";
import {JigsawSliderModule} from "jigsaw/component/slider/index";

@NgModule({
    declarations: [
        SetResizeLineWidthDemoComponent
    ],
    imports: [
        JigsawViewEditorModule,
        JigsawSliderModule
    ],
    exports: [SetResizeLineWidthDemoComponent],
})
export class SetResizeLineWidthDemoModule {

}
