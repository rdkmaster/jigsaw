import { Component } from "@angular/core";
import { DemoSetBase } from "../../template/demo-template/demo-template";

@Component({
    templateUrl: 'demo.component.html',
})
export class DragDropDemoComponent extends DemoSetBase {
    public demoPath = "demo/drag-drop";
    public docPath = ['directive/JigsawDraggable', 'directive/JigsawDroppable'];
}
