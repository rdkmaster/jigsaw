import {NgModule} from '@angular/core';
import {SetResizeLineWidthDemoComponent} from "./demo.component";
import {JigsawSliderModule} from "jigsaw/component/slider/index";
import {JigsawBoxModule} from "../../../../jigsaw/component/box/index";

@NgModule({
    declarations: [
        SetResizeLineWidthDemoComponent
    ],
    imports: [
        JigsawBoxModule,
        JigsawSliderModule
    ],
    exports: [SetResizeLineWidthDemoComponent],
})
export class SetResizeLineWidthDemoModule {

}
