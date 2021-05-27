import {NgModule} from "@angular/core";
import {JigsawPaginationModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PaginationBigDataDemoComponent} from "./demo.component";

@NgModule({
    declarations: [PaginationBigDataDemoComponent],
    exports: [PaginationBigDataDemoComponent],
    imports: [JigsawPaginationModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class PaginationBigDataDemoModule{

}
