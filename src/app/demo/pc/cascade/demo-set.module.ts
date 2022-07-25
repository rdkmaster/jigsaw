import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CascadeAllModule} from "./all/demo.module";
import {CascadeAllComponent} from "./all/demo.component";

export const routerConfig = [
    {
        path: 'all', component: CascadeAllComponent
    },
    // {
    //     path: 'cross-select', component: CascadeCrossSelectDemoComponent
    // },
    // {
    //     path: 'preset-multi-dimensional-data', component: CascadeMultiDimensionalFillBackDemoComponent
    // },

];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        // CascadeCrossSelectDemoModule,
        // CascadeMultiDimensionalFillBackDemoModule,
        CascadeAllModule
    ]
})
export class CascadeDemoModule {

}
