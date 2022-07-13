import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawHeaderModule, JigsawPaginationModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PaginationBasicDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    declarations: [PaginationBasicDemoComponent],
    exports: [PaginationBasicDemoComponent],
    imports: [JigsawPaginationModule, JigsawSwitchModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawButtonModule, DemoTemplateModule]
})
export class PaginationBasicDemoModule{

}
