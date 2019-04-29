import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/pc-components/graph/index";
import {CustomGraphComponent} from "./demo.component";
import {JigsawDraggableModule} from "jigsaw/common/directive/dragdrop/index";

@NgModule({
    declarations: [CustomGraphComponent],
    exports: [CustomGraphComponent],
    imports: [JigsawGraphModule, JigsawDraggableModule]
})
export class CustomGraphModule {

}
