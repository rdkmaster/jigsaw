import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/public_api";
import {DoughnutGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [DoughnutGraphComponent],
    exports: [DoughnutGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class DoughnutGraphModule {

}
