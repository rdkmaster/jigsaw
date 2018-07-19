import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SelectBasicDemoModule} from "./basic/demo.module";
import {SelectAsyncModule} from "./async/demo.module";

import {SelectBasicDemoComponent} from "./basic/demo.component";
import {SelectAsyncComponent} from "./async/demo.component";
import {SelectOptionCountDemoComponent} from "./option-count/demo.component";
import {SelectOptionCountDemoModule} from "./option-count/demo.module";
import {SelectDisabledDemoComponent} from "app/demo/select/disabled/demo.component";
import {SelectDisabledDemoModule} from "./disabled/demo.module";
import {SelectLineEllipsisDemoComponent} from "./line-ellipsis/demo.component";
import {SelectLineEllipsisDemoModule} from "./line-ellipsis/demo.module";
import {SelectTriggerDemoComponent} from "./trigger/demo.component";
import {SelectTriggerDemoModule} from "./trigger/demo.module";
import {SelectPresetDemoComponent} from "./preset/demo.component";
import {SelectPresetDemoModule} from "./preset/demo.module";
import {SelectMultipleDemoComponent} from "./multiple/demo.component";
import {SelectMultipleDemoModule} from "./multiple/demo.module";
import {SelectSearchableDemoComponent} from "./searchable/demo.component";
import {SelectSearchableDemoModule} from "./searchable/demo.module";
import {SelectSizeDemoComponent} from "./size/demo.component";
import {SelectSizeDemoModule} from "./size/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: SelectBasicDemoComponent
    },
    {
        path: 'async', component: SelectAsyncComponent
    },
    {
        path: 'preset', component: SelectPresetDemoComponent
    },
    {
        path: 'option-count', component: SelectOptionCountDemoComponent
    },
    {
        path: 'disabled', component: SelectDisabledDemoComponent
    },
    {
        path: 'line-ellipsis', component: SelectLineEllipsisDemoComponent
    },
    {
        path: 'trigger', component: SelectTriggerDemoComponent
    },
    {
        path: 'multiple', component: SelectMultipleDemoComponent
    },
    {
        path: 'searchable', component: SelectSearchableDemoComponent
    },
    {
        path: 'size', component: SelectSizeDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        SelectBasicDemoModule,
        SelectOptionCountDemoModule,
        SelectAsyncModule,
        SelectDisabledDemoModule,
        SelectLineEllipsisDemoModule,
        SelectTriggerDemoModule,
        SelectPresetDemoModule,
        SelectMultipleDemoModule,
        SelectSearchableDemoModule,
        SelectSizeDemoModule
    ]
})
export class SelectDemoModule {
}
