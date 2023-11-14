import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormDisplayCommonDemoComponent} from "./common/demo.component";
import {FormDisplayCommonDemoModule} from "./common/demo.module";
import {TransFormCommonDemoComponent} from "./awade-form/demo.component";
import {TransformAwadeCommonDemoModule} from "./awade-form/demo.module";

export const routerConfig = [
    {
        path: 'common', component: FormDisplayCommonDemoComponent
    },
    {
        path: 'awade-form', component: TransFormCommonDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), FormDisplayCommonDemoModule, TransformAwadeCommonDemoModule
    ]
})
export class FormDisplayDemoModule {
}
