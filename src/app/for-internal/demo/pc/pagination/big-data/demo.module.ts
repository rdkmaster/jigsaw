import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawPaginationModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {PaginationBigDataDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [PaginationBigDataDemoComponent],
    exports: [PaginationBigDataDemoComponent],
    imports: [JigsawPaginationModule, JigsawSwitchModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class PaginationBigDataDemoModule{

}
