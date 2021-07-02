import {NgModule} from "@angular/core";
import {JigsawMobileListLiteModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ListLiteBasicDemoComponent} from "./demo.component";

import {JigsawMobileHeaderModule} from "jigsaw/mobile_public_api";

@NgModule({
    imports: [
        JigsawMobileListLiteModule, JigsawDemoDescriptionModule
    , JigsawMobileHeaderModule],
    declarations: [ListLiteBasicDemoComponent],
    exports: [ListLiteBasicDemoComponent]
})
export class ListLiteBasicDemoModule {
}
