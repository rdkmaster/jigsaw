import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawBoxModule} from "jigsaw/component/box/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BoxJustifyDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BoxJustifyDemoComponent],
    exports: [BoxJustifyDemoComponent],
    imports: [JigsawDemoDescriptionModule, CommonModule, JigsawRadioModule, JigsawBoxModule]
})
export class BoxJustifyDemoModule {

}
