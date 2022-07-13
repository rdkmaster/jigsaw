import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawPaginationModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PaginationNoDataDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [PaginationNoDataDemoComponent],
    exports: [PaginationNoDataDemoComponent],
    imports: [JigsawPaginationModule, JigsawSwitchModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule, DemoTemplateModule]
})
export class PaginationNoDataDemoModule {

}
