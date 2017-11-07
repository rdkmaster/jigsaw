
import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {GraphSetSizeComponent} from "./app.component";
@NgModule({
    declarations: [GraphSetSizeComponent],
    bootstrap: [ GraphSetSizeComponent ],
    imports: [JigsawGraphModule]
})
export class GraphSetSizeModule{

}
