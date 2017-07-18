import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {GraphWithNoDataComponent} from "./app.component";
@NgModule({
    declarations: [GraphWithNoDataComponent],
    bootstrap: [ GraphWithNoDataComponent ],
    imports: [JigsawGraphModule]
})
export class GraphWithNoDataModule{

}
