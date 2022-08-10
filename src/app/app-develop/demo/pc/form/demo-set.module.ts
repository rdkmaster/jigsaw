import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TemplateDrivenDemoModule} from "./template-driven/demo.module";

import {TemplateDrivenDemoComponent} from "./template-driven/demo.component";

export const routerConfig = [
    {
        path: 'template-driven', component: TemplateDrivenDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TemplateDrivenDemoModule,
    ]
})
export class FormDemoModule {
}
