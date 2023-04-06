import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ArrayCollectionAjaxDemoModule} from "./array-ajax/demo.module";
import {ArrayCollectionBasicDemoModule} from "./array-basic/demo.module";
import {ArrayServerSidePaginationDemoModule} from "./array-ssp/demo.module";
import {RefreshDemoModule} from "./refresh/demo.module";
import {AjaxEventsDemoModule} from "./ajax-events/demo.module";
import {StringifyDemoModule} from "./stringify/demo.module";

import {ArrayCollectionBasicDemoComponent} from "./array-basic/demo.component";
import {ArrayCollectionAjaxDemoComponent} from "./array-ajax/demo.component";
import {ArrayServerSidePaginationDemoComponent} from "./array-ssp/demo.component";
import {RefreshDemoComponent} from "./refresh/demo.component";
import {AjaxEventsDemoComponent} from "./ajax-events/demo.component";
import {LocalPageableArrayDemoComponent} from "./local-pageable-array/demo.component";
import {LocalPageableArrayDemoModule} from "./local-pageable-array/demo.module";
import {OnChangeDemoComponent} from "./on-change/demo.component";
import {OnChangeDemoModule} from "./on-change/demo.module";
import {StringifyDemoComponent} from "./stringify/demo.component";
import { InfiniteScrollPageableArrayDemoComponent } from "./infinite-scroll-pageable-array/demo.component";
import { InfiniteScrollPageableArrayDemoModule } from "./infinite-scroll-pageable-array/demo.module";
import { InfiniteScrollLocalPageableArrayDemoComponent } from "./infinite-scroll-local-pageable-array/demo.component";
import { InfiniteScrollLocalPageableArrayDemoModule } from "./infinite-scroll-local-pageable-array/demo.module";

export const routerConfig = [
    {
        path: 'array-basic', component: ArrayCollectionBasicDemoComponent
    },
    {
        path: 'array-ajax', component: ArrayCollectionAjaxDemoComponent
    },
    {
        path: 'array-ssp', component: ArrayServerSidePaginationDemoComponent
    },
    {
        path: 'refresh', component: RefreshDemoComponent
    },
    {
        path: 'ajax-events', component: AjaxEventsDemoComponent
    },
    {
        path: 'local-pageable-array', component: LocalPageableArrayDemoComponent
    },
    {
        path: 'local-infinite-scroll-array', component: InfiniteScrollLocalPageableArrayDemoComponent
    },
    {
        path: 'infinite-scroll-array', component: InfiniteScrollPageableArrayDemoComponent
    },
    {
        path: 'on-change', component: OnChangeDemoComponent
    },
    {
        path: 'stringify', component: StringifyDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ArrayCollectionAjaxDemoModule,
        ArrayCollectionBasicDemoModule,
        ArrayServerSidePaginationDemoModule,
        RefreshDemoModule, AjaxEventsDemoModule,
        LocalPageableArrayDemoModule, OnChangeDemoModule,
        StringifyDemoModule,
        InfiniteScrollPageableArrayDemoModule,
        InfiniteScrollLocalPageableArrayDemoModule
    ]
})
export class DataEncapsulationDemoModule {
}
