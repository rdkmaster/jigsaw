import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SelectBasicDemoModule} from "./basic/demo.module";
import {SelectAsyncModule} from "./async/demo.module";

import {SelectBasicDemoComponent} from "./basic/demo.component";
import {SelectAsyncComponent} from "./async/demo.component";
import {SelectOptionCountDemoComponent} from "./option-count/demo.component";
import {SelectOptionCountDemoModule} from "./option-count/demo.module";
import {SelectDisabledDemoComponent} from "app/for-internal/demo/pc/select/disabled/demo.component";
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
import {SelectClearableDemoComponent} from "./clearable/demo.component";
import {SelectClearableDemoModule} from "./clearable/demo.module";
import { MultipleSelectDemoComponent } from './multiple-select/demo.component';
import { MultipleSelectDemoModule } from './multiple-select/demo.module';
import {SelectOptionWidthDemoComponent} from "./option-width/demo.component";
import {SelectOptionWidthDemoModule} from "./option-width/demo.module";
import { SelectValueChangeDemoComponent } from './value-change/demo.component';
import { SelectValueChangeDemoModule } from './value-change/demo.module';
import { SelectValidDemoComponent } from './valid/demo.component';
import { SelectValidDemoModule } from './valid/demo.module';
import { SelectInfiniteScrollDemoComponent } from "./infinite-scroll/demo.component";
import { SelectInfiniteScrollDemoModule } from "./infinite-scroll/demo.module";
import { SelectManualSearchDemoComponent } from "./manual-search/demo.component";
import { SelectManualSearchDemoModule } from "./manual-search/demo.module";
import { SelectShowBorderDemoModule } from "./show-border/demo.module";
import { SelectShowBorderDemoComponent } from "./show-border/demo.component";

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
        path: 'show-border', component: SelectShowBorderDemoComponent
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
    {
        path: 'clearable', component: SelectClearableDemoComponent
    },
    {
        path: 'multiple-select', component: MultipleSelectDemoComponent
    },
    {
        path: 'option-width', component: SelectOptionWidthDemoComponent
    },
    {
        path: 'value-change', component: SelectValueChangeDemoComponent
    },
    {
        path: 'valid', component: SelectValidDemoComponent
    },
    {
        path: 'infinite-scroll', component: SelectInfiniteScrollDemoComponent
    },
    {
        path: 'manual-search', component: SelectManualSearchDemoComponent
    }
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
        SelectSizeDemoModule,
        SelectClearableDemoModule,
        MultipleSelectDemoModule,
        SelectOptionWidthDemoModule,
        SelectValueChangeDemoModule,
        SelectValidDemoModule,
        SelectInfiniteScrollDemoModule,
        SelectManualSearchDemoModule,
        SelectShowBorderDemoModule
    ]
})
export class SelectDemoModule {
}
