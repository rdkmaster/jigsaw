import {NgModule} from "@angular/core";
import {JigsawPaginationModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PaginationBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [PaginationBasicDemoComponent],
    exports: [PaginationBasicDemoComponent],
    imports: [JigsawPaginationModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class PaginationBasicDemoModule{

}
