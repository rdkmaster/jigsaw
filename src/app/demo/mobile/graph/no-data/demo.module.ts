import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile-components/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {GraphWithNoDataComponent} from "./demo.component";

@NgModule({
    declarations: [GraphWithNoDataComponent],
    exports: [GraphWithNoDataComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule]
})
export class GraphWithNoDataModule {

}
