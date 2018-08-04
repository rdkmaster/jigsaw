import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BarGraphComponent} from "./demo.component";

@NgModule({
    declarations: [BarGraphComponent],
    exports: [BarGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class BarGraphModule {

}
