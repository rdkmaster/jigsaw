import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {AjaxLineGraphComponent} from "./app.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [AjaxLineGraphComponent],
    exports: [AjaxLineGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class AjaxLineGraphModule {

}
