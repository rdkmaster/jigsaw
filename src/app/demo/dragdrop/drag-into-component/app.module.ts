import {NgModule} from "@angular/core";
import {DragIntoCmptDemoComponent} from "./app.component";
import {JigsawDraggableModule, JigsawDroppableModule} from "jigsaw/directive/dragdrop/index";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawScrollBarModule} from "jigsaw/component/scrollbar/scrollbar";

@NgModule({
    imports: [JigsawDraggableModule, JigsawDroppableModule, JigsawTableModule, JigsawScrollBarModule],
    declarations: [DragIntoCmptDemoComponent],
    bootstrap: [DragIntoCmptDemoComponent]
})
export class DragIntoCmptDemoModule{

}
