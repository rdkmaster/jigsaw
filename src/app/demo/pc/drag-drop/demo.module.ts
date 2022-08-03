import {NgModule} from "@angular/core";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {DragDropDemoComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {JigsawDraggableModule, JigsawDroppableModule} from "../../../../jigsaw/common/directive/dragdrop";
import {CommonModule} from "@angular/common";
import {DragToReplaceDemoComponent} from "./drag-to-replace/demo.component";
import {JigsawTableModule} from "../../../../jigsaw/pc-components/table/table";
import {TableDragDemoComponent} from "./simple-table-dragdrop/demo.component";
import {JigsawTagModule} from "../../../../jigsaw/pc-components/tag/tag";
import {JigsawTableRendererModule} from "../../../../jigsaw/pc-components/table/table-renderer";
import {JigsawAutoCompleteInputModule} from "../../../../jigsaw/pc-components/input/auto-complete-input";
import {TableDragDeleteRow, TableDragReplaceRow} from "./simple-table-dragdrop/table-renderer";

@NgModule({
    declarations: [DragDropDemoComponent, DragToReplaceDemoComponent, TableDragDemoComponent, TableDragReplaceRow, TableDragDeleteRow],
    imports:[DemoTemplateModule, JigsawMarkdownModule,  JigsawDraggableModule, JigsawDroppableModule, CommonModule,
    JigsawTableModule, JigsawTagModule, JigsawTableRendererModule, JigsawAutoCompleteInputModule]
})
export class DragDropDemoModule{
}
