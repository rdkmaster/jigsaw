import {NgModule} from "@angular/core";
import {TableActionsAllComponent} from "./demo.component";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {JigsawMarkdownModule} from "../../../libs/markdown/markdown";
import {
    JigsawButtonModule,
    JigsawTableModule,
    JigsawSelectModule,
    JigsawPaginationModule,
    JigsawSwitchModule,
    JigsawButtonBarModule,
    JigsawCheckBoxModule,
    JigsawDraggableModule,
    JigsawDroppableModule,
    JigsawTagModule,
    JigsawTableRendererModule,
    JigsawAutoCompleteInputModule,
    JigsawDialogModule,
    PopupService,
    JigsawInputModule
} from "jigsaw/public_api";
import {TableAutoFillUpDemoComponent} from "./auto-fill-up/demo.component";
import {TableAutoPageableDemoComponent} from "./auto-page-sizing/demo.component";
import {MyTableCellOption, MyTableHeadOption, TableAddColumnDemoComponent} from "./add-column/demo.component";
import {TableDataChangeDemoComponent} from "./data-change/demo.component";
import {CommonModule} from "@angular/common";
import {TableDraggableDemoComponent} from "./draggable-table/demo.component";
import {TableSelectRowDemoComponent} from "./select-row/demo.component";
import {TableResizeDemoComponent} from "./resize/demo.component";
import {TableExpandPageableDemoComponent} from "./expand-pageable/demo.component";
import {TableDataWithPopupDemoComponent} from "./with-popup/demo.component";
import {TableAutoSaveDemoComponent} from "./auto-save/demo.component";
@NgModule({
    declarations: [
        TableActionsAllComponent,
        TableAutoFillUpDemoComponent,
        TableAutoPageableDemoComponent,
        TableAddColumnDemoComponent,
        MyTableHeadOption,
        MyTableCellOption,
        TableDataChangeDemoComponent,
        TableDraggableDemoComponent,
        TableSelectRowDemoComponent,
        TableResizeDemoComponent,
        TableExpandPageableDemoComponent,
        TableDataWithPopupDemoComponent,
        TableAutoSaveDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawButtonModule,
        JigsawTableModule,
        JigsawSelectModule,
        JigsawPaginationModule,
        JigsawSwitchModule,
        JigsawButtonBarModule,
        JigsawCheckBoxModule,
        JigsawDraggableModule,
        JigsawDroppableModule,
        JigsawTagModule,
        JigsawTableRendererModule,
        JigsawAutoCompleteInputModule,
        CommonModule,
        JigsawDialogModule,
        JigsawInputModule
    ],
    providers: [PopupService],
})
export class TableActionsDemoModule {
}
