import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {GraphSetSizeComponent} from "./demo.component";

@NgModule({
    declarations: [GraphSetSizeComponent],
    exports: [GraphSetSizeComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule]
})
export class GraphSetSizeModule {

}
