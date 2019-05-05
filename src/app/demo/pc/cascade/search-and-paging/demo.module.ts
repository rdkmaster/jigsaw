import {NgModule} from "@angular/core";
import {JigsawCascadeModule} from "jigsaw/pc-components/cascade/cascade";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeSearchAndPagingDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CascadeSearchAndPagingDemoComponent],
    exports: [CascadeSearchAndPagingDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule]
})
export class CascadeSearchAndPagingDemoModule {

}
