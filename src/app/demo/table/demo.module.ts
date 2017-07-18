import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TableBasicDemoComponent} from "./basic/basic";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawTableRendererModule} from "jigsaw/component/table/table-renderer";
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawPaginationModule} from "jigsaw/component/pagination/pagination";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawDialogModule} from "jigsaw/component/dialog/dialog";
import {PopupService} from "jigsaw/service/popup.service";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {TableRendererDemoComponent} from "./renderer/renderer";
import {TableHeadSelect, TableHeadIcon} from "./renderer/table-renderer";
import {TablePerformsDemoComponent} from "./performs/performs";
import {TableSetHeaderRenderDemoComponent} from "./setHeaderRender/setHeaderRender";
import {TableSetHeaderClassDemoComponent} from "./setHeaderClass/setHeaderClass";
import {TableColumnSetWidthDemoComponent} from "./setColumnWidth/setColumnWidth";
import {TableColumnSetVisibleDemoComponent} from "./setColumnVisible/setColumnVisible";
import {TableSetHeaderSortDemoComponent} from "./setHeaderSort/setHeaderSort";
import {TableSetCellRenderDemoComponent} from "./setCellRender/setCellRender";
import {TableSetCellClassDemoComponent} from "./setCellClass/setCellClass";
import {TableColumnGroupDemoComponent} from "./setColumnGroup/setColumnGroup";
import {TableSetCellEditableDemoComponent, MyTableCellEditor, MyTableCell} from "./setCellEditable/setCellEditable";
import {TableAddColumnDemoComponent, MyTableHeadOption, MyTableCellOption} from "./addColumn/addColumn";
import {TableFixedHeadDemoComponent} from "./fixedHead/fixedHead";
import {TablePageableDemoComponent} from "./pageable/demo";
import {TableDataFromAjaxDemoComponent} from "./dataFromAjax/dataFromAjax";
import {TableScrollAmountDemoComponent} from "./scrollAmount/scrollAmount";
import {TableAddIDColumnDemoComponent} from "./addIDColumn/addIDColumn";
import {TableAddCheckboxColumnDemoComponent} from "./addCheckboxColumn/addCheckboxColumn";
import {TableDataChangeDemoComponent} from "./dataChange/dataChange";
import {TableAddIDWithPagingComponent} from "./addIDWithPaging/addIDWithPaging";
import {TableDataWithPopupDemoComponent} from "./withPopup/withPopup";
import {TableRendererOfTemplateRefDemoComponent} from "./rendererOfTemplateRef/rendererOfTemplateRef";
import {TableLineEllipsisDemoComponent} from "./lineEllipsis/lineElliosis";
import {TableAddIDWithDebouncePagingComponent} from "./addIDWithDebouncePaging/addIDWithDebouncePaging";
import {LocalPagingDataDemoComponent} from "./localPagingData/localPagingData";

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
    },{
        path: 'addIDColumn', component: TableAddIDColumnDemoComponent
    },{
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
        path: 'localPaging', component: LocalPagingDataDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: TableBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        TableBasicDemoComponent,
        TableRendererDemoComponent,
        TablePerformsDemoComponent,
        TableFixedHeadDemoComponent,
        TableHeadSelect,
        TableHeadIcon,
        TableColumnSetWidthDemoComponent,
        TableColumnSetVisibleDemoComponent,
        TableSetHeaderRenderDemoComponent,
        TableSetHeaderClassDemoComponent,
        TableSetHeaderSortDemoComponent,
        TableSetCellRenderDemoComponent,
        TableSetCellClassDemoComponent,
        TableColumnGroupDemoComponent,
        MyTableCellEditor,
        MyTableCell,
        TableSetCellEditableDemoComponent,
        MyTableHeadOption,
        MyTableCellOption,
        TableAddColumnDemoComponent,
        TablePageableDemoComponent,
        TableDataFromAjaxDemoComponent,
        TableScrollAmountDemoComponent,
        TableAddIDColumnDemoComponent,
        TableAddCheckboxColumnDemoComponent,
        TableDataChangeDemoComponent,
        TableAddIDWithPagingComponent,
        TableDataWithPopupDemoComponent,
        TableRendererOfTemplateRefDemoComponent,
        TableLineEllipsisDemoComponent,
        TableAddIDWithDebouncePagingComponent,
        LocalPagingDataDemoComponent
    ],
    imports: [
        RouterModule.forChild(tableDemoRoutes),
        JigsawTableModule,
        JigsawTableRendererModule,
        JigsawSelectModule,
        JigsawCheckBoxModule,
        JigsawPaginationModule,
        JigsawInputModule,
        JigsawButtonModule,
        JigsawDialogModule,
    ],
    exports: [ ],
    entryComponents: [
        TableHeadSelect,
        TableHeadIcon,
        MyTableCell,
        MyTableHeadOption,
        MyTableCellOption,
        MyTableCellEditor
    ],
    providers: [PopupService],
})
export class TableDemoModule {
}
