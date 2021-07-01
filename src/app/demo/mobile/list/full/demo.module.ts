import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileListModule, JigsawMobileCheckBoxModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListFullDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        JigsawMobileListModule, CommonModule, JigsawMobileCheckBoxModule,
        JigsawDemoDescriptionModule
    , JigsawHeaderModule],
    declarations: [ListFullDemoComponent],
    exports: [ListFullDemoComponent]
})
export class ListFullDemoModule {
}
