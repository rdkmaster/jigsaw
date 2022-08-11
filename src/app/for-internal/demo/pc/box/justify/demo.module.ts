import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule, JigsawBoxModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BoxJustifyDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [BoxJustifyDemoComponent],
    exports: [BoxJustifyDemoComponent],
    imports: [JigsawDemoDescriptionModule, CommonModule, JigsawRadioModule, JigsawBoxModule, JigsawHeaderModule]
})
export class BoxJustifyDemoModule {

}
