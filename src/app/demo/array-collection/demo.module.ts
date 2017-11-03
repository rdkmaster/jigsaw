import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ArrayCollectionAjaxDemoModule} from "./ajax/app.module";
import {ArrayCollectionBasicDemoModule} from "./basic/app.module";
import {ServerSidePaginationDemoModule} from "./server-side-pagination/app.module";

import {ArrayCollectionBasicDemoComponent} from "./basic/app.component";
import {ArrayCollectionAjaxDemoComponent} from "./ajax/app.component";
import {ServerSidePaginationDemoComponent} from "./server-side-pagination/app.component";

export const routerConfig = [
    {
        path: 'basic', component: ArrayCollectionBasicDemoComponent
    },
    {
        path: 'ajax', component: ArrayCollectionAjaxDemoComponent
    },
    {
        path: 'server-side-pagination', component: ServerSidePaginationDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ArrayCollectionAjaxDemoModule,
        ArrayCollectionBasicDemoModule,
        ServerSidePaginationDemoModule
    ]
})
export class ArrayCollectionDemoModule {
}
