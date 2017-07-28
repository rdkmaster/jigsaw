import {NgModule} from "@angular/core";
import {H5DragDemoComponent} from "./app.component";
import {JigsawH5DraggableModule} from "../../../../jigsaw/component/draggable/draggable-h5";

@NgModule({
    imports: [JigsawH5DraggableModule],
    declarations: [H5DragDemoComponent],
    bootstrap: [H5DragDemoComponent]
})
export class H5DragDemoModule{

}
