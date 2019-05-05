import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";
import {JigsawBoxModule} from "jigsaw/pc-components/box/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BoxJustifyDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BoxJustifyDemoComponent],
    exports: [BoxJustifyDemoComponent],
    imports: [JigsawDemoDescriptionModule, CommonModule, JigsawRadioModule, JigsawBoxModule]
})
export class BoxJustifyDemoModule {

}
