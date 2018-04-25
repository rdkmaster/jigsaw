import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CascadeBasicDemoComponent} from "./basic/demo.component";
import {CascadeBasicDemoModule} from "./basic/demo.module";
import {CascadeMultipleDemoComponent} from "./multiple-select/demo.component";
import {CascadeMultipleDemoModule} from "./multiple-select/demo.module";
import {CascadeDataFillBackDemoComponent} from "./data-fill-back/demo.component";
import {CascadeDataFillBackDemoModule} from "./data-fill-back/demo.module";

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
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        CascadeBasicDemoModule,
        CascadeMultipleDemoModule,
        CascadeDataFillBackDemoModule,
    ]
})
export class CascadeDemoModule {

}
