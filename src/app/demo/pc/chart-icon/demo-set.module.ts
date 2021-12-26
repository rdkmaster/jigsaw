import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ChartIconBasicDemoModule} from "./basic/demo.module";
import {ChartIconBasicDemoComponent} from "./basic/demo.component";
import {ChartIconTableDemoComponent} from "./with-table/demo.component";
import {ChartIconTableDemoModule} from "./with-table/demo.module";
import {ChartIconButtonDemoComponent} from "./with-button/demo.component";
import {ChartIconButtonDemoModule} from "./with-button/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: ChartIconBasicDemoComponent
    },
    {
        path: 'with-table', component: ChartIconTableDemoComponent
    },
    {
        path: 'with-button', component: ChartIconButtonDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ChartIconBasicDemoModule,
        ChartIconTableDemoModule,
        ChartIconButtonDemoModule
    ]
})
export class ChartIconDemoModule {
}
