import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {BigTableDataDemoComponent} from "./big-table/demo.component";
import {BigTableDataDemoModule} from "./big-table/demo.module";
import {LocalPagingDataDemoComponent} from "./local-paging-data/demo.component";
import {LocalPagingDataDemoModule} from "./local-paging-data/demo.module";
import {SwimLaneDiagramDemoComponent} from "./swim-lane-diagram/demo.component";
import {SwimLaneDiagramDemoModule} from "./swim-lane-diagram/demo.module";
import {TableAddCheckboxColumnDemoComponent} from "./checkbox-column/demo.component";
import {TableAddCheckboxColumnDemoModule} from "./checkbox-column/demo.module";
import {TableAddColumnDemoComponent} from "./add-column/demo.component";
import {TableAddColumnDemoModule} from "./add-column/demo.module";
import {TableAddIDColumnDemoComponent} from "./index-column/demo.component";
import {TableAddIDColumnDemoModule} from "./index-column/demo.module";
import {TableAddIDWithDebouncePagingComponent} from "./debounce-while-changing-page/demo.component";
import {TableAddIDWithDebouncePagingModule} from "./debounce-while-changing-page/demo.module";
import {TableAddIDWithPagingComponent} from "./index-column-with-paging/demo.component";
import {TableAddIDWithPagingModule} from "./index-column-with-paging/demo.module";
import {TableBasicDemoComponent} from "./basic/demo.component";
import {TableBasicDemoModule} from "./basic/demo.module";
import {TableCheckboxColumnObjectCellDemoComponent} from "./checkbox-column-object-cell/demo.component";
import {TableCheckboxColumnObjectCellDemoModule} from "./checkbox-column-object-cell/demo.module";
import {TableColumnGroupDemoComponent} from "./column-group/demo.component";
import {TableColumnGroupDemoModule} from "./column-group/demo.module";
import {TableColumnSetVisibleDemoComponent} from "./column-visible/demo.component";
import {TableColumnSetVisibleDemoModule} from "./column-visible/demo.module";
import {TableColumnSetWidthDemoComponent} from "./update-column-width/demo.component";
import {TableColumnSetWidthDemoModule} from "./update-column-width/demo.module";
import {TableContentWidthDemoComponent} from "./content-width/demo.component";
import {TableContentWidthDemoModule} from "./content-width/demo.module";
import {TableDataChangeDemoComponent} from "./data-change/demo.component";
import {TableDataChangeDemoModule} from "./data-change/demo.module";
import {TableDataFromAjaxDemoComponent} from "./data-from-ajax/demo.component";
import {TableDataFromAjaxDemoModule} from "./data-from-ajax/demo.module";
import {TableDataWithPopupDemoComponent} from "./with-popup/demo.component";
import {TableDataWithPopupDemoModule} from "./with-popup/demo.module";
import {TableCalendarDemoComponent} from "./calendar/demo.component";
import {TableCalendarDemoModule} from "./calendar/demo.module";
import {TableFixedHeadDemoComponent} from "./fixed-header/demo.component";
import {TableFixedHeadDemoModule} from "./fixed-header/demo.module";
import {TableHideHeadDemoComponent} from "./hide-header/demo.component";
import {TableHideHeadDemoModule} from "./hide-header/demo.module";
import {TablePageableDemoComponent} from "./pageable/demo.component";
import {TablePageableDemoModule} from "./pageable/demo.module";
import {TableRendererDemoComponent} from "./renderer/demo.component";
import {TableRendererDemoModule} from "./renderer/demo.module";
import {TableRendererOfTemplateRefDemoComponent} from "./template-ref-renderer/demo.component";
import {TableRendererOfTemplateRefDemoModule} from "./template-ref-renderer/demo.module";
import {TableSelectRowDemoComponent} from "./select-row/demo.component";
import {TableSelectRowDemoModule} from "./select-row/demo.module";
import {TableSetCellClassDemoComponent} from "./set-cell-class/demo.component";
import {TableSetCellClassDemoModule} from "./set-cell-class/demo.module";
import {TableSetCellEditableDemoComponent} from "./cell-editable/demo.component";
import {TableSetCellEditableDemoModule} from "./cell-editable/demo.module";
import {TableSetCellRenderDemoComponent} from "./cell-render/demo.component";
import {TableSetCellRenderDemoModule} from "./cell-render/demo.module";
import {TableSetHeaderClassDemoComponent} from "./header-class/demo.component";
import {TableSetHeaderClassDemoModule} from "./header-class/demo.module";
import {TableSetHeaderRenderDemoComponent} from "./header-render/demo.component";
import {TableSetHeaderRenderDemoModule} from "./header-render/demo.module";
import {TableSetHeaderSortDemoComponent} from "./sortable/demo.component";
import {TableSetHeaderSortDemoModule} from "./sortable/demo.module";
import {BigRowDemoComponent} from "./big-row/demo.component";
import {BigColumnDemoComponent} from "./big-column/demo.component";
import {BigRowDemoModule} from "./big-row/demo.module";
import {BigColumnDemoModule} from "./big-column/demo.module";
import {TableResizeDemoComponent} from "./resize/demo.component";
import {TableResizeDemoModule} from "./resize/demo.module";
import {TableScrollListenDemoComponent} from "./scroll-listen/demo.component";
import {TableScrollListenDemoModule} from "./scroll-listen/demo.module";
import {SudokuGameComponent} from "./sudoku/demo.component";
import {SodokuGameModule} from "./sudoku/demo.module";
import {TableAddCheckboxColumnPageableDemoModule} from "./checkbox-column-pageable/demo.module";
import {TableAddCheckboxColumnPageableDemoComponent} from "./checkbox-column-pageable/demo.component";
import {TableSwitchRendererDemoComponent} from "./switch-column/demo.component";
import {TableSwitchRendererDemoModule} from "./switch-column/demo.module";

export const routerConfig = [
    {
        path: 'renderer', component: TableRendererDemoComponent
    },
    {
        path: 'swim-lane-diagram', component: SwimLaneDiagramDemoComponent
    },
    {
        path: 'big-table', component: BigTableDataDemoComponent
    },
    {
        path: 'content-width', component: TableContentWidthDemoComponent
    },
    {
        path: 'calendar', component: TableCalendarDemoComponent
    },
    {
        path: 'sudoku', component: SudokuGameComponent
    },
    {
        path: 'basic', component: TableBasicDemoComponent
    },
    {
        path: 'data-from-ajax', component: TableDataFromAjaxDemoComponent
    },
    {
        path: 'update-column-width', component: TableColumnSetWidthDemoComponent
    },
    {
        path: 'column-visible', component: TableColumnSetVisibleDemoComponent
    },
    {
        path: 'header-render', component: TableSetHeaderRenderDemoComponent
    },
    {
        path: 'header-class', component: TableSetHeaderClassDemoComponent
    },
    {
        path: 'sortable', component: TableSetHeaderSortDemoComponent
    },
    {
        path: 'cell-render', component: TableSetCellRenderDemoComponent
    },
    {
        path: 'set-cell-class', component: TableSetCellClassDemoComponent
    },
    {
        path: 'column-group', component: TableColumnGroupDemoComponent
    },
    {
        path: 'cell-editable', component: TableSetCellEditableDemoComponent
    },
    {
        path: 'add-column', component: TableAddColumnDemoComponent
    },
    {
        path: 'index-column', component: TableAddIDColumnDemoComponent
    },
    {
        path: 'checkbox-column', component: TableAddCheckboxColumnDemoComponent
    },
    {
        path: 'checkbox-column-object-cell', component: TableCheckboxColumnObjectCellDemoComponent
    },
    {
        path: 'fixed-header', component: TableFixedHeadDemoComponent
    },
    {
        path: 'pageable', component: TablePageableDemoComponent
    },
    {
        path: 'data-change', component: TableDataChangeDemoComponent
    },
    {
        path: 'index-column-with-paging', component: TableAddIDWithPagingComponent
    },
    {
        path: 'debounce-while-changing-page', component: TableAddIDWithDebouncePagingComponent
    },
    {
        path: 'with-popup', component: TableDataWithPopupDemoComponent
    },
    {
        path: 'template-ref-renderer', component: TableRendererOfTemplateRefDemoComponent
    },
    {
        path: 'local-paging-data', component: LocalPagingDataDemoComponent
    },
    {
        path: 'hide-header', component: TableHideHeadDemoComponent
    },
    {
        path: 'select-row', component: TableSelectRowDemoComponent
    },
    {
        path: 'big-row', component: BigRowDemoComponent
    },
    {
        path: 'big-column', component: BigColumnDemoComponent
    },
    {
        path: 'resize', component: TableResizeDemoComponent
    },
    {
        path: 'scroll-listen', component: TableScrollListenDemoComponent
    },
    {
        path: 'checkbox-column-pageable', component: TableAddCheckboxColumnPageableDemoComponent
    },
    {
        path: 'switch-renderer', component: TableSwitchRendererDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TableAddCheckboxColumnDemoModule, TableAddColumnDemoModule, TableAddIDColumnDemoModule, TableAddIDWithDebouncePagingModule,
        TableAddIDWithPagingModule, TableBasicDemoModule, TableDataChangeDemoModule, TableDataFromAjaxDemoModule,
        TableFixedHeadDemoModule, BigTableDataDemoModule, LocalPagingDataDemoModule, TablePageableDemoModule,
        TableRendererDemoModule, TableRendererOfTemplateRefDemoModule, TableContentWidthDemoModule, BigColumnDemoModule,
        TableSetCellClassDemoModule, TableSetCellEditableDemoModule, TableSetCellRenderDemoModule, TableColumnGroupDemoModule,
        TableColumnSetVisibleDemoModule, TableColumnSetWidthDemoModule, TableSetHeaderClassDemoModule, TableSetHeaderRenderDemoModule,
        TableSetHeaderSortDemoModule, TableDataWithPopupDemoModule, SwimLaneDiagramDemoModule, TableHideHeadDemoModule,
        TableSelectRowDemoModule, TableCheckboxColumnObjectCellDemoModule, TableCalendarDemoModule, BigRowDemoModule, TableResizeDemoModule,
        TableScrollListenDemoModule, SodokuGameModule, TableAddCheckboxColumnPageableDemoModule, TableSwitchRendererDemoModule
    ]
})
export class TableDemoModule {
}
