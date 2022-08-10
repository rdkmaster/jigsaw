import {NgModule} from "@angular/core";
import {JigsawGraphModule, JigsawInputModule, JigsawSwitchModule} from "jigsaw/public_api";
import {GraphResizeComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

@NgModule({
    declarations: [GraphResizeComponent],
    exports: [GraphResizeComponent],
    imports: [JigsawGraphModule, JigsawInputModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class GraphResizeModule {

}
