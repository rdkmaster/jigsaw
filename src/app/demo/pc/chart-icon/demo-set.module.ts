import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ChartIconBasicDemoModule} from "./basic/demo.module";
import {ChartIconBasicDemoComponent} from "./basic/demo.component";
import {ChartIconTableDemoComponent} from "./with-table/demo.component";
import {ChartIconTableDemoModule} from "./with-table/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: ChartIconBasicDemoComponent
    },
    {
        path: 'with-table', component: ChartIconTableDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ChartIconBasicDemoModule,
        ChartIconTableDemoModule,
    ]
})
export class ChartIconDemoModule {
}
