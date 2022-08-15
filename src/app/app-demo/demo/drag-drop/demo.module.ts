import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { DragDropDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../markdown/markdown";
import { JigsawDraggableModule, JigsawDroppableModule, JigsawTableModule, JigsawTagModule, JigsawTableRendererModule, JigsawAutoCompleteInputModule } from "jigsaw/public_api";
import { DragToReplaceDemoComponent } from "./drag-to-replace/demo.component";
import {TableDragDemoComponent} from "./simple-table-dragdrop/demo.component";
import {TableDragDeleteRow, TableDragReplaceRow} from "./simple-table-dragdrop/table-renderer";

@NgModule({
    declarations: [DragDropDemoComponent, DragToReplaceDemoComponent, TableDragDemoComponent, TableDragReplaceRow, TableDragDeleteRow],
    imports: [DemoTemplateModule, JigsawMarkdownModule, JigsawDraggableModule, JigsawDroppableModule, CommonModule,
        JigsawTableModule, JigsawTagModule, JigsawTableRendererModule, JigsawAutoCompleteInputModule]
})
export class DragDropDemoModule {
}
