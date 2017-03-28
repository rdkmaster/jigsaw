import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ArrayCollectionBasicDemoComponent} from "./basic/basic";

const buttonDemoRoutes = [
    {
        path: '', redirectTo: 'basic', pathMatch: 'full'
    },
    {
        path: 'basic', component: ArrayCollectionBasicDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: ArrayCollectionBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        ArrayCollectionBasicDemoComponent
    ],
    imports: [
        RouterModule.forChild(buttonDemoRoutes),
    ],
    exports: [
        ArrayCollectionBasicDemoComponent
    ],
    providers: []
})
export class ArrayCollectionDemoModule {
}
