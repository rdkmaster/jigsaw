import {NgModule} from "@angular/core";
import {PieGraphDemoComponent} from "./app.component";
import {JigsawGraphModule} from "../../../../jigsaw/component/graph/index";
@NgModule({
    declarations: [PieGraphDemoComponent],
    imports: [JigsawGraphModule]
})
export class PieGraphDemoModule{

}
