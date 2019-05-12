import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile-components/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BarGraphComponent} from "./demo.component";

@NgModule({
    declarations: [BarGraphComponent],
    exports: [BarGraphComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule]
})
export class BarGraphModule {

}
