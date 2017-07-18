import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {ArrayCollectionAjaxDemoComponent} from "./ajax/demo";
import {ArrayCollectionBasicDemoComponent} from "./basic/demo";
import {ServerSidePaginationDemoComponent} from "./server-side-pagination/demo";

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
        RouterModule.forChild(buttonDemoRoutes), CommonModule, JigsawButtonModule
    ],
    exports: [
        ArrayCollectionBasicDemoComponent, ArrayCollectionAjaxDemoComponent, ServerSidePaginationDemoComponent
    ],
    providers: []
})
export class ArrayCollectionDemoModule {
}
