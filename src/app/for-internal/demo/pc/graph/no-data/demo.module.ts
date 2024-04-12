import {NgModule} from "@angular/core";
import {JigsawGraphModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {GraphWithNoDataComponent} from "./demo.component";

@NgModule({
    declarations: [GraphWithNoDataComponent],
    exports: [GraphWithNoDataComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class GraphWithNoDataModule {

}
