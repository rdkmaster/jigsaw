import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {BasicGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [BasicGraphComponent],
    exports: [BasicGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class BasicGraphModule {

}
