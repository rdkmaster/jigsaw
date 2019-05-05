import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/pc-components/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {LineGraphComponent} from "./demo.component";

@NgModule({
    declarations: [LineGraphComponent],
    exports: [LineGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class LineGraphModule {

}
