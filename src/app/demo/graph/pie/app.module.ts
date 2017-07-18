import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {PieGraphDemoComponent} from "./app.component";
@NgModule({
    declarations: [PieGraphDemoComponent],
    imports: [JigsawGraphModule]
})
export class PieGraphDemoModule{

}
