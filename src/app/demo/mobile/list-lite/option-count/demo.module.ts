import {NgModule} from "@angular/core";
import {JigsawMobileListLiteModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteOptionCountDemoComponent} from "./demo.component";

import {JigsawMobileHeaderModule} from "jigsaw/mobile_public_api";

@NgModule({
    imports: [
        JigsawMobileListLiteModule, JigsawDemoDescriptionModule
    , JigsawMobileHeaderModule],
    declarations: [ListLiteOptionCountDemoComponent],
    exports: [ListLiteOptionCountDemoComponent]
})
export class ListLiteOptionCountDemoModule {
}
