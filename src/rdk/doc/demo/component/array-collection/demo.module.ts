import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ArrayCollectionAjaxDemoComponent} from "./ajax/demo";
import {ArrayCollectionBasicDemoComponent} from "./basic/demo";

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
        path: '**', //fallback router must in the last
        component: ArrayCollectionBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        ArrayCollectionBasicDemoComponent, ArrayCollectionAjaxDemoComponent
    ],
    imports: [
        RouterModule.forChild(buttonDemoRoutes), CommonModule
    ],
    exports: [
        ArrayCollectionBasicDemoComponent, ArrayCollectionAjaxDemoComponent
    ],
    providers: []
})
export class ArrayCollectionDemoModule {
}
