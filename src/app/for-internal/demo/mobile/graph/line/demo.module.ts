import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {LineGraphComponent} from "./demo.component";

import {JigsawMobileHeaderModule} from "jigsaw/mobile_public_api";

@NgModule({
    declarations: [LineGraphComponent],
    exports: [LineGraphComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule, JigsawMobileHeaderModule]
})
export class LineGraphModule {

}
