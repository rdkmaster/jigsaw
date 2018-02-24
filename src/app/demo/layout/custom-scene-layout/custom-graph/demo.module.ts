import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {CustomGraphComponent} from "./demo.component";

@NgModule({
    declarations: [CustomGraphComponent],
    exports: [CustomGraphComponent],
    imports: [JigsawGraphModule]
})
export class CustomGraphModule {

}
