import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CascadeBasicDemoComponent} from "./basic/demo.component";
import {CascadeBasicDemoModule} from "./basic/demo.module";
import {CascadeMultipleDemoComponent} from "./multiple-select/demo.component";
import {CascadeMultipleDemoModule} from "./multiple-select/demo.module";
import {CascadeDataFillBackDemoComponent} from "./data-fill-back/demo.component";
import {CascadeDataFillBackDemoModule} from "./data-fill-back/demo.module";
import {CascadeMultiDataFillBackDemoComponent} from "app/demo/cascade/multi-data-fill-back/demo.component";
import {CascadeMultiDataFillBackDemoModule} from "./multi-data-fill-back/demo.module";
import {CascadeMultiDimensionalDemoComponent} from "./multi-dimensional-select/demo.component";
import {CascadeMultiDimensionalDemoModule} from "./multi-dimensional-select/demo.module";
import {CascadeMultiDimensionalFillBackDemoComponent} from "./multi-dimensional-fill-back/demo.component";
import {CascadeMultiDimensionalFillBackDemoModule} from "./multi-dimensional-fill-back/demo.module";
import {CascadeShowAllDemoComponent} from "./show-all/demo.component";
import {CascadeShowAllDemoModule} from "./show-all/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: CascadeBasicDemoComponent
    },
    {
        path: 'multiple', component: CascadeMultipleDemoComponent
    },
    {
        path: 'data-fill-back', component: CascadeDataFillBackDemoComponent
    },
    {
        path: 'multi-data-fill-back', component: CascadeMultiDataFillBackDemoComponent
    },
    {
        path: 'multi-dimensional', component: CascadeMultiDimensionalDemoComponent
    },
    {
        path: 'multi-dimensional-fill-back', component: CascadeMultiDimensionalFillBackDemoComponent
    },
    {
        path: 'show-all', component: CascadeShowAllDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        CascadeBasicDemoModule,
        CascadeMultipleDemoModule,
        CascadeDataFillBackDemoModule,
        CascadeMultiDataFillBackDemoModule,
        CascadeMultiDimensionalDemoModule,
        CascadeMultiDimensionalFillBackDemoModule,
        CascadeShowAllDemoModule
    ]
})
export class CascadeDemoModule {

}
