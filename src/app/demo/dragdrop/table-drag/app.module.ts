import {NgModule} from "@angular/core";
import {TableCellOption, TableDragDemoComponent} from "./app.component";
import {JigsawDraggableModule, JigsawDroppableModule} from "jigsaw/directive/dragdrop/index";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawScrollBarModule} from "jigsaw/component/scrollbar/scrollbar";

@NgModule({
    imports: [JigsawDraggableModule, JigsawDroppableModule, JigsawTableModule, JigsawScrollBarModule],
    declarations: [TableDragDemoComponent, TableCellOption],
    bootstrap: [TableDragDemoComponent],
    entryComponents: [TableCellOption]
})
export class TableDragDemoModule{

}
