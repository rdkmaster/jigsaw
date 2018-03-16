import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ArrayCollectionAjaxDemoModule} from "./array-ajax/demo.module";
import {ArrayCollectionBasicDemoModule} from "./array-basic/demo.module";
import {ArrayServerSidePaginationDemoModule} from "./array-ssp/demo.module";
import {DataIntroduceModule} from "./introduce/demo.module";
import {RefreshDemoModule} from "./refresh/demo.module";
import {AjaxEventsDemoModule} from "./ajax-events/demo.module";

import {ArrayCollectionBasicDemoComponent} from "./array-basic/demo.component";
import {ArrayCollectionAjaxDemoComponent} from "./array-ajax/demo.component";
import {ArrayServerSidePaginationDemoComponent} from "./array-ssp/demo.component";
import {DataIntroduceComponent} from "./introduce/demo.component";
import {RefreshDemoComponent} from "./refresh/demo.component";
import {AjaxEventsDemoComponent} from "./ajax-events/demo.component";

export const routerConfig = [
    {
        path: 'introduce', component: DataIntroduceComponent
    },
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
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        DataIntroduceModule,
        ArrayCollectionAjaxDemoModule,
        ArrayCollectionBasicDemoModule,
        ArrayServerSidePaginationDemoModule,
        RefreshDemoModule, AjaxEventsDemoModule
    ]
})
export class DataEncapsulationDemoModule {
}
