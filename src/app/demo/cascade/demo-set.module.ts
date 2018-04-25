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
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        CascadeBasicDemoModule,
        CascadeMultipleDemoModule,
        CascadeDataFillBackDemoModule,
        CascadeMultiDataFillBackDemoModule,
    ]
})
export class CascadeDemoModule {

}
