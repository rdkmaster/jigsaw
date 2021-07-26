import {NgModule} from "@angular/core";
import {JigsawCascadeModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeSearchAndPagingDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [CascadeSearchAndPagingDemoComponent],
    exports: [CascadeSearchAndPagingDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class CascadeSearchAndPagingDemoModule {

}
