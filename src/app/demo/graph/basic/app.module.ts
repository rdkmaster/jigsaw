import {NgModule} from "@angular/core";
import {BasicGraphComponent} from "./app.component";
import {JigsawGraphModule} from "../../../../jigsaw/component/graph/index";
@NgModule({
    declarations: [BasicGraphComponent],
    imports: [JigsawGraphModule]
})
export class BasicGraphModule{

}
