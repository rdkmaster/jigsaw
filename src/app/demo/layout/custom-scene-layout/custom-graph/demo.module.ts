import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {CustomGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [CustomGraphComponent],
    exports: [CustomGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class CustomGraphModule {

}
