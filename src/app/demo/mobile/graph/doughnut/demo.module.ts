import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile-components/graph/index";
import {DoughnutGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [DoughnutGraphComponent],
    exports: [DoughnutGraphComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule]
})
export class DoughnutGraphModule {

}
