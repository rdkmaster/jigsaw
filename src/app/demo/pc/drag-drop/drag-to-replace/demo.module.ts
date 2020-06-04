import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDraggableModule, JigsawDroppableModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DragToReplaceDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawDraggableModule, JigsawDroppableModule, CommonModule, JigsawDemoDescriptionModule
    ],
    declarations: [DragToReplaceDemoComponent],
    exports: [DragToReplaceDemoComponent]
})
export class DragToReplaceDemoModule {

}
