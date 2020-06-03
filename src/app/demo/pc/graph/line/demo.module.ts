import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {LineGraphComponent} from "./demo.component";

@NgModule({
    declarations: [LineGraphComponent],
    exports: [LineGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class LineGraphModule {

}
