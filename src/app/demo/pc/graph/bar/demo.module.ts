import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BarGraphComponent} from "./demo.component";

@NgModule({
    declarations: [BarGraphComponent],
    exports: [BarGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class BarGraphModule {

}
