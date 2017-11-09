import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ArrayCollectionAjaxDemoModule} from "./array-ajax/app.module";
import {ArrayCollectionBasicDemoModule} from "./array-basic/app.module";
import {ArrayServerSidePaginationDemoModule} from "./array-ssp/app.module";
import {DataFullDemoModule} from "./full/app.module";

import {ArrayCollectionBasicDemoComponent} from "./array-basic/app.component";
import {ArrayCollectionAjaxDemoComponent} from "./array-ajax/app.component";
import {ArrayServerSidePaginationDemoComponent} from "./array-ssp/app.component";
import {DataFullDemoComponent} from "./full/app.component";

export const routerConfig = [
    {
        path: 'full', component: DataFullDemoComponent
    },
    {
        path: 'array-basic', component: ArrayCollectionBasicDemoComponent
    },
    {
        path: 'array-ajax', component: ArrayCollectionAjaxDemoComponent, recommended: true
    },
    {
        path: 'array-ssp', component: ArrayServerSidePaginationDemoComponent, recommended: true
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        DataFullDemoModule,
        ArrayCollectionAjaxDemoModule,
        ArrayCollectionBasicDemoModule,
        ArrayServerSidePaginationDemoModule
    ]
})
export class DataEncapsulationDemoModule {
}
