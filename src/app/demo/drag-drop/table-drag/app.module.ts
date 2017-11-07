import {NgModule} from "@angular/core";
import {TableDragDemoComponent} from "./app.component";
import {JigsawDraggableModule, JigsawDroppableModule} from "jigsaw/directive/dragdrop/index";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawTagModule} from "jigsaw/component/tag/tag";
import {TableDragDeleteRow, TableDragReplaceRow} from "./table-renderer";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [JigsawDraggableModule, JigsawDroppableModule, JigsawTableModule, JigsawTagModule, CommonModule],
    declarations: [TableDragDemoComponent, TableDragReplaceRow, TableDragDeleteRow],
    bootstrap: [TableDragDemoComponent],
    entryComponents: [TableDragReplaceRow, TableDragDeleteRow]
})
export class TableDragDemoModule{

}
