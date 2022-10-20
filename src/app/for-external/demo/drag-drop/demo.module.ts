import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DragDropDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { JigsawDraggableModule, JigsawDroppableModule, JigsawTableModule, JigsawTagModule, JigsawTableRendererModule, JigsawAutoCompleteInputModule } from "jigsaw/public_api";
import { DragToReplaceDemoComponent } from "./drag-to-replace/demo.component";
import { TableDragDemoComponent } from "./simple-table-drag-drop/demo.component";
import { TableDragDeleteRow, TableDragReplaceRow } from "./simple-table-drag-drop/table-renderer";

@NgModule({
    declarations: [
        DragDropDemoComponent,
        DragToReplaceDemoComponent,
        TableDragDemoComponent,
        TableDragReplaceRow,
        TableDragDeleteRow
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        JigsawMarkdownModule,
        JigsawDraggableModule,
        JigsawDroppableModule,
        CommonModule,
        JigsawTableModule,
        JigsawTagModule,
        JigsawTableRendererModule,
        JigsawAutoCompleteInputModule
    ]
})
export class DragDropDemoModule {
}
