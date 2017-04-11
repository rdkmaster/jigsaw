import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TableBasicDemoComponent} from "./basic/basic";
import {TableRendererDemoComponent} from "./renderer/renderer";
import {RdkTableModule, DefaultCellRenderer} from "../../../../component/table/table";
import {TableHead, TableCell, TableHeadSelect, TableHeadCheckbox,TableCellCheckbox, TableCellOption, TableHeadOption, TableCellNum, TableHeadNum} from "./renderer/table-renderer";
import {RdkSelectModule} from "../../../../component/select/select";
import {RdkCheckBoxModule} from "../../../../component/checkbox/index";
import {RdkPaginationModule} from "../../../../component/pagination/pagination";
import {TableRendererService} from "./renderer/tableRendererService";

const tableDemoRoutes=[
    {
        path:'', redirectTo:'basic', pathMatch:'full'
    },
    {
        path:'basic', component: TableBasicDemoComponent
    },
    {
        path:'renderer', component: TableRendererDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: TableBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        TableBasicDemoComponent,
        TableRendererDemoComponent,
        DefaultCellRenderer,
        TableHead,
        TableCell,
        TableHeadSelect,
        TableHeadCheckbox,
        TableCellCheckbox,
        TableCellOption,
        TableHeadOption,
        TableCellNum,
        TableHeadNum
    ],
    imports: [
        RouterModule.forChild(tableDemoRoutes), RdkTableModule, RdkSelectModule, RdkCheckBoxModule, RdkPaginationModule
    ],
    exports: [
        TableBasicDemoComponent, TableRendererDemoComponent
    ],
    providers: [TableRendererService],
    entryComponents: [
        DefaultCellRenderer,
        TableHead,
        TableCell,
        TableHeadSelect,
        TableHeadCheckbox,
        TableCellCheckbox,
        TableCellOption,
        TableHeadOption,
        TableCellNum,
        TableHeadNum
    ]
})
export class TableDemoModule { }
