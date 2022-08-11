import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {GraphWithNoDataComponent} from "./demo.component";

@NgModule({
    declarations: [GraphWithNoDataComponent],
    exports: [GraphWithNoDataComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule]
})
export class GraphWithNoDataModule {

}
