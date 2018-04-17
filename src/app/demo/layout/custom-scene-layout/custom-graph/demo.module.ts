import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {CustomGraphComponent} from "./demo.component";
import {JigsawDraggableModule} from "jigsaw/directive/dragdrop/index";

@NgModule({
    declarations: [CustomGraphComponent],
    exports: [CustomGraphComponent],
    imports: [JigsawGraphModule, JigsawDraggableModule]
})
export class CustomGraphModule {

}
