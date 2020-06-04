import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule, JigsawBoxModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BoxJustifyDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BoxJustifyDemoComponent],
    exports: [BoxJustifyDemoComponent],
    imports: [JigsawDemoDescriptionModule, CommonModule, JigsawRadioModule, JigsawBoxModule]
})
export class BoxJustifyDemoModule {

}
