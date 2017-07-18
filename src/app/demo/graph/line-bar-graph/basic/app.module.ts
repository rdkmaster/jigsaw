import {NgModule} from "@angular/core";
import {BasicLineGraphComponent} from "./app.component";
import {JigsawGraphModule} from "../../../../../jigsaw/component/graph/index";
@NgModule({
    declarations: [BasicLineGraphComponent],
    imports: [JigsawGraphModule]
})
export class BasicLineGraphModule{

}
