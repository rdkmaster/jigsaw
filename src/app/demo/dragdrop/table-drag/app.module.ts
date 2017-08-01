import {NgModule} from "@angular/core";
import {TableDragDemoComponent} from "./app.component";
import {JigsawDraggableModule, JigsawDroppableModule} from "jigsaw/directive/dragdrop/index";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawScrollBarModule} from "jigsaw/component/scrollbar/scrollbar";
import {TableDelRow, TableReplaceRow} from "./table-renderer";

@NgModule({
    imports: [JigsawDraggableModule, JigsawDroppableModule, JigsawTableModule, JigsawScrollBarModule],
    declarations: [TableDragDemoComponent, TableReplaceRow, TableDelRow],
    bootstrap: [TableDragDemoComponent],
    entryComponents: [TableReplaceRow, TableDelRow]
})
export class TableDragDemoModule{

}
