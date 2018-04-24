import {NgModule} from '@angular/core';
import {JigsawSliderModule} from "jigsaw/component/slider/index";
import {JigsawBoxModule} from "jigsaw/component/box/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SetResizeLineWidthDemoComponent} from "./demo.component";

@NgModule({
    declarations: [
        SetResizeLineWidthDemoComponent
    ],
    imports: [
        JigsawBoxModule, JigsawSliderModule, JigsawDemoDescriptionModule
    ],
    exports: [SetResizeLineWidthDemoComponent],
})
export class SetResizeLineWidthDemoModule {

}
