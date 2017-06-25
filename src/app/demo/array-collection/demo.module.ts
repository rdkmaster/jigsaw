import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ArrayCollectionAjaxDemoComponent} from "./ajax/demo";
import {ArrayCollectionBasicDemoComponent} from "./basic/demo";
import {ServerSidePaginationDemoComponent} from "./server-side-pagination/demo";
import {RdkButtonModule} from "../../../rdk/component/button/button";

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
    declarations: [
        ArrayCollectionBasicDemoComponent, ArrayCollectionAjaxDemoComponent, ServerSidePaginationDemoComponent
    ],
    imports: [
        RouterModule.forChild(buttonDemoRoutes), CommonModule, RdkButtonModule
    ],
    exports: [
        ArrayCollectionBasicDemoComponent, ArrayCollectionAjaxDemoComponent, ServerSidePaginationDemoComponent
    ],
    providers: []
})
export class ArrayCollectionDemoModule {
}
