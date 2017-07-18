import {NgModule} from "@angular/core";
import {GraphWithNoDataComponent} from "./app.component";
import {JigsawGraphModule} from "../../../../jigsaw/component/graph/index";
@NgModule({
    declarations: [GraphWithNoDataComponent],
    imports: [JigsawGraphModule]
})
export class GraphWithNoDataModule{

}
