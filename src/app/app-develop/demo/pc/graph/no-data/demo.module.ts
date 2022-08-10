import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {GraphWithNoDataComponent} from "./demo.component";

@NgModule({
    declarations: [GraphWithNoDataComponent],
    exports: [GraphWithNoDataComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class GraphWithNoDataModule {

}
