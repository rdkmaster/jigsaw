import {NgModule} from "@angular/core";
import {JigsawMobileListLiteModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ListLitePresetValueDemoComponent} from "./demo.component";

import {JigsawMobileHeaderModule} from "jigsaw/mobile_public_api";

@NgModule({
    imports: [
        JigsawMobileListLiteModule, JigsawDemoDescriptionModule
    , JigsawMobileHeaderModule],
    declarations: [ListLitePresetValueDemoComponent],
    exports: [ListLitePresetValueDemoComponent]
})
export class ListLitePresetValueDemoModule {
}
