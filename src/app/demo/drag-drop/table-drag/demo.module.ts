import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDraggableModule, JigsawDroppableModule} from "jigsaw/directive/dragdrop/index";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawTagModule} from "jigsaw/component/tag/tag";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableDragDemoComponent} from "./demo.component";
import {TableDragDeleteRow, TableDragReplaceRow} from "./table-renderer";

@NgModule({
    imports: [
        JigsawDraggableModule, JigsawDroppableModule, JigsawTableModule, JigsawTagModule,
        CommonModule, JigsawDemoDescriptionModule
    ],
    declarations: [TableDragDemoComponent, TableDragReplaceRow, TableDragDeleteRow],
    exports: [TableDragDemoComponent],
    entryComponents: [TableDragReplaceRow, TableDragDeleteRow]
})
export class TableDragDemoModule {

}
