import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ZoneForBetterPerformanceDemoComponent} from "./zone-for-performance/app.component";
import {ZoneForBetterPerformanceDemoModule} from "./zone-for-performance/app.module";

const routes = [
    {
        path: 'zone-for-performance', component: ZoneForBetterPerformanceDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ZoneForBetterPerformanceDemoModule,
    ]
})
export class MiscDemoModule {
}
