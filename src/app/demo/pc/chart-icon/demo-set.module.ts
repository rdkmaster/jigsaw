import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ChartIconBasicDemoModule} from "./basic/demo.module";
import {ChartIconBasicDemoComponent} from "./basic/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: ChartIconBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ChartIconBasicDemoModule,
    ]
})
export class ChartIconDemoModule {
}
