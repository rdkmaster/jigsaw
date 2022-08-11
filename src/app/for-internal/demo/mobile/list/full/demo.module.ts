import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileListModule, JigsawMobileCheckBoxModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ListFullDemoComponent} from "./demo.component";

import {JigsawMobileHeaderModule} from "jigsaw/mobile_public_api";

@NgModule({
    imports: [
        JigsawMobileListModule, CommonModule, JigsawMobileCheckBoxModule,
        JigsawDemoDescriptionModule
    , JigsawMobileHeaderModule],
    declarations: [ListFullDemoComponent],
    exports: [ListFullDemoComponent]
})
export class ListFullDemoModule {
}
