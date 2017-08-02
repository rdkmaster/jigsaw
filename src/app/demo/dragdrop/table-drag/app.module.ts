import {NgModule} from "@angular/core";
import {TableDragDemoComponent} from "./app.component";
import {JigsawDraggableModule, JigsawDroppableModule} from "jigsaw/directive/dragdrop/index";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawScrollBarModule} from "jigsaw/component/scrollbar/scrollbar";
import {TableDragDeleteRow, TableDragReplaceRow} from "./table-renderer";

@NgModule({
    imports: [JigsawDraggableModule, JigsawDroppableModule, JigsawTableModule, JigsawScrollBarModule],
    declarations: [TableDragDemoComponent, TableDragReplaceRow, TableDragDeleteRow],
    bootstrap: [TableDragDemoComponent],
    entryComponents: [TableDragReplaceRow, TableDragDeleteRow]
})
export class TableDragDemoModule{

}
