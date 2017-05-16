import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TableBasicDemoComponent} from "./basic/basic";
import {TableRendererDemoComponent} from "./renderer/renderer";
import {RdkTableModule} from "../../../../component/table/table";
import {
    TableHeadCheckbox,
    TableCellCheckbox,
    TableCellOption,
    TableCellNum,
    TableCellEditor,
    DefaultCellRenderer
} from "../../../../component/table/table-renderer";
import {TableHeadSelect, TableHeadIcon} from "./renderer/table-renderer";
import {RdkSelectModule} from "../../../../component/select/select";
import {RdkCheckBoxModule} from "../../../../component/checkbox/index";
import {RdkPaginationModule} from "../../../../component/pagination/pagination";
import {RdkInputModule} from "../../../../component/input/input";
import {TablePerformsDemoComponent} from "./performs/performs";
import {
    TableSetHeaderRenderDemoComponent
} from "./setHeaderRender/setHeaderRender";
import {TableSetHeaderClassDemoComponent} from "./setHeaderClass/setHeaderClass";
import {TableColumnSetWidthDemoComponent} from "./setColumnWidth/setColumnWidth";
import {TableColumnSetVisibleDemoComponent} from "./setColumnVisible/setColumnVisible";
import {TableSetHeaderSortDemoComponent} from "./setHeaderSort/setHeaderSort";
import {TableSetCellRenderDemoComponent
} from "./setCellRender/setCellRender";
import {TableSetCellClassDemoComponent} from "./setCellClass/setCellClass";
import {TableColumnGroupDemoComponent} from "./setColumnGroup/setColumnGroup";
import {TableSetCellEditableDemoComponent, MyTableCellEditor, MyTableCell} from "./setCellEditable/setCellEditable";
import {
    TableAddColumnDemoComponent, MyTableHeadOption, MyTableCellOption
} from "./addColumn/addColumn";
import {TableFixedHeadDemoComponent} from "./fixedHead/fixedHead";
import {TablePageableDemoComponent} from "./pageable/demo";
import {TableDataFromAjaxDemoComponent} from "./dataFromAjax/dataFromAjax";
import {TableScrollAmountDemoComponent} from "./scrollAmount/scrollAmount";
import {TableAddIDColumnDemoComponent} from "./addIDColumn/addIDColumn";
import {TableAddCheckboxColumnDemoComponent} from "./addCheckboxColumn/addCheckboxColumn";
import {TableDataChangeDemoComponent} from "./dataChange/dataChange";
import {RdkButtonModule} from "../../../../component/button/button";
import {TableAddIDWithPagingComponent} from "./addIDWithPaging/addIDWithPaging";
import {TableDataWithPopupDemoComponent} from "./withPopup/withPopup";
import {RdkDialogModule} from "../../../../component/dialog/dialog";
import {PopupService} from "../../../../service/popup.service";
import {TableRendererOfTemplateRefDemoComponent} from "./rendererOfTemplateRef/rendererOfTemplateRef";
import {RdkBlock, RdkBlockModule} from "../../../../component/block/block";

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
        path: 'withPopup', component: TableDataWithPopupDemoComponent
    },
    {
        path: 'rendererOfTemplateRef', component: TableRendererOfTemplateRefDemoComponent
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
        DefaultCellRenderer,
        TableHeadSelect,
        TableHeadIcon,
        TableHeadCheckbox,
        TableCellCheckbox,
        TableCellOption,
        TableCellNum,
        TableCellEditor,
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
    ],
    imports: [
        RouterModule.forChild(tableDemoRoutes),
        RdkTableModule,
        RdkSelectModule,
        RdkCheckBoxModule,
        RdkPaginationModule,
        RdkInputModule,
        RdkButtonModule,
        RdkDialogModule,
        RdkBlockModule
    ],
    exports: [ ],
    entryComponents: [
        DefaultCellRenderer,
        TableHeadSelect,
        TableHeadIcon,
        TableHeadCheckbox,
        TableCellCheckbox,
        TableCellOption,
        TableCellNum,
        TableCellEditor,
        MyTableCell,
        MyTableHeadOption,
        MyTableCellOption,
        MyTableCellEditor,
        RdkBlock
    ],
    providers: [PopupService],
})
export class TableDemoModule {
}
