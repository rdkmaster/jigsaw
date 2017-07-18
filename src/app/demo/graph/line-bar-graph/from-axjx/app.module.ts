import {NgModule} from "@angular/core";
import {AjaxLineGraphComponent} from "./app.component";
import {JigsawGraphModule} from "../../../../../jigsaw/component/graph/index";
@NgModule({
    declarations: [AjaxLineGraphComponent],
    imports: [JigsawGraphModule]
})
export class AjaxLineGraphModule{

}
