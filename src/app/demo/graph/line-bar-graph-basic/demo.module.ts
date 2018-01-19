import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BasicLineGraphComponent} from "./demo.component";

@NgModule({
    declarations: [BasicLineGraphComponent],
    exports: [BasicLineGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class BasicLineGraphModule {

}
