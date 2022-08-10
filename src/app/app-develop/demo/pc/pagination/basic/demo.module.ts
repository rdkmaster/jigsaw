import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawHeaderModule, JigsawPaginationModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {PaginationBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [PaginationBasicDemoComponent],
    exports: [PaginationBasicDemoComponent],
    imports: [JigsawPaginationModule, JigsawSwitchModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawButtonModule]
})
export class PaginationBasicDemoModule{

}
