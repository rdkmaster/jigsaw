import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {GraphSetSizeComponent} from "./demo.component";

@NgModule({
    declarations: [GraphSetSizeComponent],
    exports: [GraphSetSizeComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class GraphSetSizeModule {

}
