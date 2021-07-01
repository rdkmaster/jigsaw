import {NgModule} from "@angular/core";
import {JigsawMobileListLiteModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteOptionCountDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        JigsawMobileListLiteModule, JigsawDemoDescriptionModule
    , JigsawHeaderModule],
    declarations: [ListLiteOptionCountDemoComponent],
    exports: [ListLiteOptionCountDemoComponent]
})
export class ListLiteOptionCountDemoModule {
}
