import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TableAddCheckboxColumnDemoModule} from "./checkbox-column/app.module";
import {TableAddColumnDemoModule} from "./add-column/app.module";
import {TableAddIDColumnDemoModule} from "./index-column/app.module";
import {TableAddIDWithDebouncePagingModule} from "./debounce-while-changing-page/app.module";
import {TableAddIDWithPagingModule} from "./index-column-with-paging/app.module";
import {TableBasicDemoModule} from "./basic/app.module";
import {TableDataChangeDemoModule} from "./data-change/app.module";
import {TableDataFromAjaxDemoModule} from "./data-from-ajax/app.module";
import {TableFixedHeadDemoModule} from "./fixed-header/app.module";
import {TableLineEllipsisDemoModule} from "./line-ellipsis/app.module";
import {LocalPagingDataDemoModule} from "./local-paging-data/app.module";
import {TablePageableDemoModule} from "./pageable/app.module";
import {TablePerformsDemoModule} from "./performance/app.module";
import {TableRendererOfTemplateRefDemoModule} from "./template-ref-renderer/app.module";
import {TableSetCellClassDemoModule} from "./set-cell-class/app.module";
import {TableSetCellEditableDemoModule} from "./cell-editable/app.module";
import {TableSetCellRenderDemoModule} from "./cell-render/app.module";
import {TableColumnGroupDemoModule} from "./column-group/app.module";
import {TableColumnSetVisibleDemoModule} from "./column-visible/app.module";
import {TableColumnSetWidthDemoModule} from "./update-column-width/app.module";
import {TableSetHeaderClassDemoModule} from "./header-class/app.module";
import {TableSetHeaderRenderDemoModule} from "./header-render/app.module";
import {TableSetHeaderSortDemoModule} from "./sortable/app.module";
import {TableDataWithPopupDemoModule} from "./with-popup/app.module";
import {TableHideHeadDemoModule} from "./hide-header/app.module";
import {TableSelectRowDemoModule} from "./select-row/app.module";
import {TableRendererDemoModule} from "./renderer/app.module";
import {BigTableDataDemoModule} from "./big-table/app.module";
import {swimLaneDiagramDemoModule} from "./swim-lane-diagram/app.module";
import {TableContentWidthDemoModule} from "./content-width/app.module";

import {TableRendererDemoComponent} from "./renderer/app.component";
import {SwimLaneDiagramDemoComponent} from "./swim-lane-diagram/app.component";
import {BigTableDataDemoComponent} from "./big-table/app.component";
import {TableContentWidthDemoComponent} from "./content-width/app.component";
import {TableBasicDemoComponent} from "./basic/app.component";
import {TableDataFromAjaxDemoComponent} from "./data-from-ajax/app.component";
import {TablePerformsDemoComponent} from "./performance/app.component";
import {TableColumnSetWidthDemoComponent} from "./update-column-width/app.component";
import {TableColumnSetVisibleDemoComponent} from "./column-visible/app.component";
import {TableSetHeaderRenderDemoComponent} from "./header-render/app.component";
import {TableSetHeaderClassDemoComponent} from "./header-class/app.component";
import {TableSetHeaderSortDemoComponent} from "./sortable/app.component";
import {TableSetCellRenderDemoComponent} from "./cell-render/app.component";
import {TableSetCellClassDemoComponent} from "./set-cell-class/app.component";
import {TableColumnGroupDemoComponent} from "./column-group/app.component";
import {TableSetCellEditableDemoComponent} from "./cell-editable/app.component";
import {TableAddColumnDemoComponent} from "./add-column/app.component";
import {TableAddIDColumnDemoComponent} from "./index-column/app.component";
import {TableAddCheckboxColumnDemoComponent} from "./checkbox-column/app.component";
import {TableFixedHeadDemoComponent} from "./fixed-header/app.component";
import {TablePageableDemoComponent} from "./pageable/app.component";
import {TableDataChangeDemoComponent} from "./data-change/app.component";
import {TableAddIDWithPagingComponent} from "./index-column-with-paging/app.component";
import {TableAddIDWithDebouncePagingComponent} from "./debounce-while-changing-page/app.component";
import {TableDataWithPopupDemoComponent} from "./with-popup/app.component";
import {TableRendererOfTemplateRefDemoComponent} from "./template-ref-renderer/app.component";
import {TableLineEllipsisDemoComponent} from "./line-ellipsis/app.component";
import {LocalPagingDataDemoComponent} from "./local-paging-data/app.component";
import {TableHideHeadDemoComponent} from "./hide-header/app.component";
import {TableSelectRowDemoComponent} from "./select-row/app.component";

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
        path: 'performance', component: TablePerformsDemoComponent
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
        path: 'line-ellipsis', component: TableLineEllipsisDemoComponent
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
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TableAddCheckboxColumnDemoModule, TableAddColumnDemoModule, TableAddIDColumnDemoModule, TableAddIDWithDebouncePagingModule,
        TableAddIDWithPagingModule, TableBasicDemoModule, TableDataChangeDemoModule, TableDataFromAjaxDemoModule,
        TableFixedHeadDemoModule, TableLineEllipsisDemoModule, LocalPagingDataDemoModule, TablePageableDemoModule,
        TablePerformsDemoModule, TableRendererDemoModule, TableRendererOfTemplateRefDemoModule, TableContentWidthDemoModule,
        TableSetCellClassDemoModule, TableSetCellEditableDemoModule, TableSetCellRenderDemoModule, TableColumnGroupDemoModule,
        TableColumnSetVisibleDemoModule, TableColumnSetWidthDemoModule, TableSetHeaderClassDemoModule, TableSetHeaderRenderDemoModule,
        TableSetHeaderSortDemoModule, TableDataWithPopupDemoModule, swimLaneDiagramDemoModule, TableHideHeadDemoModule,
        TableSelectRowDemoModule, BigTableDataDemoModule
    ]
})
export class TableDemoModule {
}
