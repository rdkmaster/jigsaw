import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ZoneForBetterPerformanceDemoModule} from "./zone-for-performance/demo.module";

import {ZoneForBetterPerformanceDemoComponent} from "./zone-for-performance/demo.component";

export const routerConfig = [
    {
        path: 'zone-for-performance', component: ZoneForBetterPerformanceDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ZoneForBetterPerformanceDemoModule,
    ]
})
export class MiscDemoModule {
}
