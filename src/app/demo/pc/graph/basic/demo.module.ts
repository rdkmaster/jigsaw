import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/public_api";
import {BasicGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [BasicGraphComponent],
    exports: [BasicGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class BasicGraphModule {

}
