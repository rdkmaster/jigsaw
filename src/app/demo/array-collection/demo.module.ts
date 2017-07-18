import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ArrayCollectionAjaxDemoComponent} from "./ajax/app.component";
import {ArrayCollectionBasicDemoComponent} from "./basic/app.component";
import {ServerSidePaginationDemoComponent} from "./server-side-pagination/app.component";
import {ArrayCollectionAjaxDemoModule} from "./ajax/app.module";
import {ArrayCollectionBasicDemoModule} from "./basic/app.module";
import {ServerSidePaginationDemoModule} from "./server-side-pagination/app.module";

const buttonDemoRoutes = [
    {
        path: '', redirectTo: 'basic', pathMatch: 'full'
    },
    {
        path: 'basic', component: ArrayCollectionBasicDemoComponent
    },
    {
        path: 'ajax', component: ArrayCollectionAjaxDemoComponent
    },
    {
        path: 'server-side-pagination', component: ServerSidePaginationDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: ArrayCollectionBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(buttonDemoRoutes),
        ArrayCollectionAjaxDemoModule,
        ArrayCollectionBasicDemoModule,
        ServerSidePaginationDemoModule
    ]
})
export class ArrayCollectionDemoModule {
}
