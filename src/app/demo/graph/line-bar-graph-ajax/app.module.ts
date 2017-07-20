import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {AjaxLineGraphComponent} from "./app.component";
@NgModule({
    declarations: [AjaxLineGraphComponent],
    bootstrap: [ AjaxLineGraphComponent ],
    imports: [JigsawGraphModule]
})
export class AjaxLineGraphModule{

}
