import {NgModule} from "@angular/core";
import {DragToReplaceDemoComponent} from "./app.component";
import {JigsawH5DraggableModule, JigsawH5DroppableModule} from "jigsaw/component/dragdrop/index";

@NgModule({
    imports: [JigsawH5DraggableModule, JigsawH5DroppableModule],
    declarations: [DragToReplaceDemoComponent],
    bootstrap: [DragToReplaceDemoComponent]
})
export class DragToReplaceDemoModule{

}
