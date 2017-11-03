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
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('table');

@NgModule({
    imports: [
        RouterModule.forChild(config),
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
