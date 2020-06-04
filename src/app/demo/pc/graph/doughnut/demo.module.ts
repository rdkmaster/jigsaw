import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/public_api";
import {DoughnutGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [DoughnutGraphComponent],
    exports: [DoughnutGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class DoughnutGraphModule {

}
