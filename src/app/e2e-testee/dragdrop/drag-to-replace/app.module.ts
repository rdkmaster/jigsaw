import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DragToReplaceDemoComponent} from "./app.component";
import {JigsawDraggableModule, JigsawDroppableModule} from "jigsaw/directive/dragdrop/index";

@NgModule({
    imports: [JigsawDraggableModule, JigsawDroppableModule, CommonModule],
    declarations: [DragToReplaceDemoComponent],
    bootstrap: [DragToReplaceDemoComponent]
})
export class DragToReplaceDemoModule{

}
