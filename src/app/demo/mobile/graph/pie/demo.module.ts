import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile-components/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PieGraphDemoComponent} from "./demo.component";

@NgModule({
    declarations: [PieGraphDemoComponent],
    exports: [PieGraphDemoComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule]
})
export class PieGraphMobileDemoModule {

}
