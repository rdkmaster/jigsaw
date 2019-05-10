import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile-components/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {GraphSetSizeComponent} from "./demo.component";

@NgModule({
    declarations: [GraphSetSizeComponent],
    exports: [GraphSetSizeComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule]
})
export class GraphSetSizeModule {

}
