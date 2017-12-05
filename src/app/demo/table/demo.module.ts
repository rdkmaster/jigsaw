import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {BigTableDataDemoComponent} from "./big-table/app.component";
import {BigTableDataDemoModule} from "./big-table/app.module";
import {LocalPagingDataDemoComponent} from "./local-paging-data/app.component";
import {LocalPagingDataDemoModule} from "./local-paging-data/app.module";
import {SwimLaneDiagramDemoComponent} from "./swim-lane-diagram/app.component";
import {SwimLaneDiagramDemoModule} from "./swim-lane-diagram/app.module";
import {TableAddCheckboxColumnDemoComponent} from "./checkbox-column/app.component";
import {TableAddCheckboxColumnDemoModule} from "./checkbox-column/app.module";
import {TableAddColumnDemoComponent} from "./add-column/app.component";
import {TableAddColumnDemoModule} from "./add-column/app.module";
import {TableAddIDColumnDemoComponent} from "./index-column/app.component";
import {TableAddIDColumnDemoModule} from "./index-column/app.module";
import {TableAddIDWithDebouncePagingComponent} from "./debounce-while-changing-page/app.component";
import {TableAddIDWithDebouncePagingModule} from "./debounce-while-changing-page/app.module";
import {TableAddIDWithPagingComponent} from "./index-column-with-paging/app.component";
import {TableAddIDWithPagingModule} from "./index-column-with-paging/app.module";
import {TableBasicDemoComponent} from "./basic/app.component";
import {TableBasicDemoModule} from "./basic/app.module";
import {TableCheckboxColumnObjectCellDemoComponent} from "./checkbox-column-object-cell/app.component";
import {TableCheckboxColumnObjectCellDemoModule} from "./checkbox-column-object-cell/app.module";
import {TableColumnGroupDemoComponent} from "./column-group/app.component";
import {TableColumnGroupDemoModule} from "./column-group/app.module";
import {TableColumnSetVisibleDemoComponent} from "./column-visible/app.component";
import {TableColumnSetVisibleDemoModule} from "./column-visible/app.module";
import {TableColumnSetWidthDemoComponent} from "./update-column-width/app.component";
import {TableColumnSetWidthDemoModule} from "./update-column-width/app.module";
import {TableContentWidthDemoComponent} from "./content-width/app.component";
import {TableContentWidthDemoModule} from "./content-width/app.module";
import {TableDataChangeDemoComponent} from "./data-change/app.component";
import {TableDataChangeDemoModule} from "./data-change/app.module";
import {TableDataFromAjaxDemoComponent} from "./data-from-ajax/app.component";
import {TableDataFromAjaxDemoModule} from "./data-from-ajax/app.module";
import {TableDataWithPopupDemoComponent} from "./with-popup/app.component";
import {TableDataWithPopupDemoModule} from "./with-popup/app.module";
import {TableCalendarDemoComponent} from "./calendar/app.component";
import {TableCalendarDemoModule} from "./calendar/app.module";
import {TableFixedHeadDemoComponent} from "./fixed-header/app.component";
import {TableFixedHeadDemoModule} from "./fixed-header/app.module";
import {TableHideHeadDemoComponent} from "./hide-header/app.component";
import {TableHideHeadDemoModule} from "./hide-header/app.module";
import {TablePageableDemoComponent} from "./pageable/app.component";
import {TablePageableDemoModule} from "./pageable/app.module";
import {TableRendererDemoComponent} from "./renderer/app.component";
import {TableRendererDemoModule} from "./renderer/app.module";
import {TableRendererOfTemplateRefDemoComponent} from "./template-ref-renderer/app.component";
import {TableRendererOfTemplateRefDemoModule} from "./template-ref-renderer/app.module";
import {TableSelectRowDemoComponent} from "./select-row/app.component";
import {TableSelectRowDemoModule} from "./select-row/app.module";
import {TableSetCellClassDemoComponent} from "./set-cell-class/app.component";
import {TableSetCellClassDemoModule} from "./set-cell-class/app.module";
import {TableSetCellEditableDemoComponent} from "./cell-editable/app.component";
import {TableSetCellEditableDemoModule} from "./cell-editable/app.module";
import {TableSetCellRenderDemoComponent} from "./cell-render/app.component";
import {TableSetCellRenderDemoModule} from "./cell-render/app.module";
import {TableSetHeaderClassDemoComponent} from "./header-class/app.component";
import {TableSetHeaderClassDemoModule} from "./header-class/app.module";
import {TableSetHeaderRenderDemoComponent} from "./header-render/app.component";
import {TableSetHeaderRenderDemoModule} from "./header-render/app.module";
import {TableSetHeaderSortDemoComponent} from "./sortable/app.component";
import {TableSetHeaderSortDemoModule} from "./sortable/app.module";
import {BigRowDemoComponent} from "./big-row/app.component";
import {BigColumnDemoComponent} from "./big-column/app.component";
import {BigRowDemoModule} from "./big-row/app.module";
import {BigColumnDemoModule} from "./big-column/app.module";
import {TableResizeDemoComponent} from "./resize/app.component";
import {TableResizeDemoModule} from "./resize/app.module";

export const routerConfig = [
    {
        path: 'basic', component: TableBasicDemoComponent
    },
    {
        path: 'data-from-ajax', component: TableDataFromAjaxDemoComponent
    },
    {
        path: 'renderer', component: TableRendererDemoComponent, recommended: true
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
        path: 'swim-lane-diagram', component: SwimLaneDiagramDemoComponent, recommended: true
    },
    {
        path: 'hide-header', component: TableHideHeadDemoComponent
    },
    {
        path: 'select-row', component: TableSelectRowDemoComponent
    },
    {
        path: 'big-table', component: BigTableDataDemoComponent, recommended: true
    },
    {
        path: 'content-width', component: TableContentWidthDemoComponent, recommended: true
    },
    {
        path: 'calendar', component: TableCalendarDemoComponent, recommended: true
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
        TableSelectRowDemoModule, TableCheckboxColumnObjectCellDemoModule, TableCalendarDemoModule, BigRowDemoModule, TableResizeDemoModule
    ]
})
export class TableDemoModule {
}
