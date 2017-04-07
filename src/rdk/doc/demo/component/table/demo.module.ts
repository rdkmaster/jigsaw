import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TableBasicDemoComponent} from "./basic/basic";
import {TableRendererDemoComponent} from "./renderer/renderer";
import {RdkTableModule, DefaultCellRenderer} from "../../../../component/table/table";
import {TableHead, TableCell, TableHeadSelect} from "./renderer/table-renderer";
import {RdkSelectModule} from "../../../../component/select/select"

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
        TableBasicDemoComponent, TableRendererDemoComponent, DefaultCellRenderer, TableHead, TableCell, TableHeadSelect
    ],
    imports: [
        RouterModule.forChild(tableDemoRoutes), RdkTableModule, RdkSelectModule
    ],
    exports: [
        TableBasicDemoComponent, TableRendererDemoComponent
    ],
    providers: [],
    entryComponents: [DefaultCellRenderer, TableHead, TableCell, TableHeadSelect]
})
export class TableDemoModule { }
