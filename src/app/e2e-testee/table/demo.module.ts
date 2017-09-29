import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {TableAddCheckboxColumnDemoComponent} from "./addCheckboxColumn/app.component";
import {TableAddCheckboxColumnDemoModule} from "./addCheckboxColumn/app.module";

import {TableAddColumnDemoComponent} from "./addColumn/app.component";
import {TableAddColumnDemoModule} from "./addColumn/app.module";

import {TableAddIDColumnDemoComponent} from "./addIDColumn/app.component";
import {TableAddIDColumnDemoModule} from "./addIDColumn/app.module";

import {TableAddIDWithDebouncePagingComponent} from "./addIDWithDebouncePaging/app.component";
import {TableAddIDWithDebouncePagingModule} from "./addIDWithDebouncePaging/app.module";

import {TableAddIDWithPagingComponent} from "./addIDWithPaging/app.component";
import {TableAddIDWithPagingModule} from "./addIDWithPaging/app.module";

import {TableBasicDemoComponent} from "./basic/app.component";
import {TableBasicDemoModule} from "./basic/app.module";

import {TableDataChangeDemoComponent} from "./dataChange/app.component";
import {TableDataChangeDemoModule} from "./dataChange/app.module";

import {TableDataFromAjaxDemoComponent} from "./dataFromAjax/app.component";
import {TableDataFromAjaxDemoModule} from "./dataFromAjax/app.module";

import {TableFixedHeadDemoComponent} from "./fixedHead/app.component";
import {TableFixedHeadDemoModule} from "./fixedHead/app.module";

import {TableLineEllipsisDemoComponent} from "./lineEllipsis/app.component";
import {TableLineEllipsisDemoModule} from "./lineEllipsis/app.module";

import {LocalPagingDataDemoComponent} from "./localPagingData/app.component";
import {LocalPagingDataDemoModule} from "./localPagingData/app.module";

import {TablePageableDemoComponent} from "./pageable/app.component";
import {TablePageableDemoModule} from "./pageable/app.module";

import {TablePerformsDemoComponent} from "./performs/app.component";
import {TablePerformsDemoModule} from "./performs/app.module";

import {TableRendererDemoComponent} from "../../live-demo/table/renderer/app.component";
import {TableRendererDemoModule} from "../../live-demo/table/renderer/app.module";

import {TableRendererOfTemplateRefDemoComponent} from "./rendererOfTemplateRef/app.component";
import {TableRendererOfTemplateRefDemoModule} from "./rendererOfTemplateRef/app.module";

import {TableScrollAmountDemoComponent} from "./scrollAmount/app.component";
import {TableScrollAmountDemoModule} from "./scrollAmount/app.module";

import {TableSetCellClassDemoComponent} from "./setCellClass/app.component";
import {TableSetCellClassDemoModule} from "./setCellClass/app.module";

import {TableSetCellEditableDemoComponent} from "./setCellEditable/app.component";
import {TableSetCellEditableDemoModule} from "./setCellEditable/app.module";

import {TableSetCellRenderDemoComponent} from "./setCellRender/app.component";
import {TableSetCellRenderDemoModule} from "./setCellRender/app.module";

import {TableColumnGroupDemoComponent} from "./setColumnGroup/app.component";
import {TableColumnGroupDemoModule} from "./setColumnGroup/app.module";

import {TableColumnSetVisibleDemoComponent} from "./setColumnVisible/app.component";
import {TableColumnSetVisibleDemoModule} from "./setColumnVisible/app.module";

import {TableColumnSetWidthDemoComponent} from "./setColumnWidth/app.component";
import {TableColumnSetWidthDemoModule} from "./setColumnWidth/app.module";

import {TableSetHeaderClassDemoComponent} from "./setHeaderClass/app.component";
import {TableSetHeaderClassDemoModule} from "./setHeaderClass/app.module";

import {TableSetHeaderRenderDemoComponent} from "./setHeaderRender/app.component";
import {TableSetHeaderRenderDemoModule} from "./setHeaderRender/app.module";

import {TableSetHeaderSortDemoComponent} from "./setHeaderSort/app.component";
import {TableSetHeaderSortDemoModule} from "./setHeaderSort/app.module";

import {TableDataWithPopupDemoComponent} from "./withPopup/app.component";
import {TableDataWithPopupDemoModule} from "./withPopup/app.module";
import {SwimLaneDiagramDemoComponent} from "./swimLaneDiagram/app.component";
import {swimLaneDiagramDemoModule} from "./swimLaneDiagram/app.module";
import {TableHideHeadDemoModule} from "./hideHead/app.module";
import {TableHideHeadDemoComponent} from "./hideHead/app.component";
import {TableSelectRowDemoComponent} from "./selectRow/app.component";
import {TableSelectRowDemoModule} from "./selectRow/app.module";

const tableDemoRoutes = [
    {
        path: '', redirectTo: 'basic', pathMatch: 'full'
    },
    {
        path: 'basic', component: TableBasicDemoComponent
    },
    {
        path: 'dataFromAjax', component: TableDataFromAjaxDemoComponent
    },
    {
        path: 'renderer', component: TableRendererDemoComponent
    },
    {
        path: 'performs', component: TablePerformsDemoComponent
    },
    {
        path: 'setColumnWidth', component: TableColumnSetWidthDemoComponent
    },
    {
        path: 'setColumnVisible', component: TableColumnSetVisibleDemoComponent
    },
    {
        path: 'setHeaderRender', component: TableSetHeaderRenderDemoComponent
    },
    {
        path: 'setHeaderClass', component: TableSetHeaderClassDemoComponent
    },
    {
        path: 'setHeaderSort', component: TableSetHeaderSortDemoComponent
    },
    {
        path: 'setCellRender', component: TableSetCellRenderDemoComponent
    },
    {
        path: 'setCellClass', component: TableSetCellClassDemoComponent
    },
    {
        path: 'setColumnGroup', component: TableColumnGroupDemoComponent
    },
    {
        path: 'setCellEditable', component: TableSetCellEditableDemoComponent
    },
    {
        path: 'addColumn', component: TableAddColumnDemoComponent
    },
    {
        path: 'addIDColumn', component: TableAddIDColumnDemoComponent
    },
    {
        path: 'addCheckboxColumn', component: TableAddCheckboxColumnDemoComponent
    },
    {
        path: 'fixedHead', component: TableFixedHeadDemoComponent
    },
    {
        path: 'pageable', component: TablePageableDemoComponent
    },
    {
        path: 'scrollAmount', component: TableScrollAmountDemoComponent
    },
    {
        path: 'dataChange', component: TableDataChangeDemoComponent
    },
    {
        path: 'addIDWithPaging', component: TableAddIDWithPagingComponent
    },
    {
        path: 'addIDWithDebouncePaging', component: TableAddIDWithDebouncePagingComponent
    },
    {
        path: 'withPopup', component: TableDataWithPopupDemoComponent
    },
    {
        path: 'rendererOfTemplateRef', component: TableRendererOfTemplateRefDemoComponent
    },
    {
        path: 'lineEllipsis', component: TableLineEllipsisDemoComponent
    },
    {
        path: 'localPagingData', component: LocalPagingDataDemoComponent
    },
    {
        path: 'swimLaneDiagram', component: SwimLaneDiagramDemoComponent
    },
    {
        path: 'hideHead', component: TableHideHeadDemoComponent
    },
    {
        path: 'selectRow', component: TableSelectRowDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: TableBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(tableDemoRoutes),
        TableAddCheckboxColumnDemoModule, TableAddColumnDemoModule, TableAddIDColumnDemoModule, TableAddIDWithDebouncePagingModule,
        TableAddIDWithPagingModule, TableBasicDemoModule, TableDataChangeDemoModule, TableDataFromAjaxDemoModule,
        TableFixedHeadDemoModule, TableLineEllipsisDemoModule, LocalPagingDataDemoModule, TablePageableDemoModule,
        TablePerformsDemoModule, TableRendererDemoModule, TableRendererOfTemplateRefDemoModule, TableScrollAmountDemoModule,
        TableSetCellClassDemoModule, TableSetCellEditableDemoModule, TableSetCellRenderDemoModule, TableColumnGroupDemoModule,
        TableColumnSetVisibleDemoModule, TableColumnSetWidthDemoModule, TableSetHeaderClassDemoModule, TableSetHeaderRenderDemoModule,
        TableSetHeaderSortDemoModule, TableDataWithPopupDemoModule, swimLaneDiagramDemoModule, TableHideHeadDemoModule, TableSelectRowDemoModule,
    ]
})
export class TableDemoModule {
}
