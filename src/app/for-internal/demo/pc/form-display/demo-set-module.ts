import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormDisplayCommonDemoComponent} from "./common/demo.component";
import {FormDisplayCommonDemoModule} from "./common/demo.module";
import {TransFormCommonDemoComponent} from "./awade-form/demo.component";
import {TransformAwadeCommonDemoModule} from "./awade-form/demo.module";
import {FormDisplayUpdateDemoModule} from "./update/demo.module";
import {FormDisplayUpdateComponent} from "./update/demo.component";
import {FormDisplayTooltipDemoModule} from "./tooltip/demo.module";
import {FormDisplayTooltipDemoComponent} from "./tooltip/demo.component";

export const routerConfig = [
    {
        path: 'common', component: FormDisplayCommonDemoComponent
    },
    {
        path: 'awade-form', component: TransFormCommonDemoComponent
    },
    {
        path: 'update', component: FormDisplayUpdateComponent
    },
    {
        path: 'tooltip', component: FormDisplayTooltipDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), FormDisplayCommonDemoModule, TransformAwadeCommonDemoModule, FormDisplayUpdateDemoModule, FormDisplayTooltipDemoModule
    ]
})
export class FormDisplayDemoModule {
}
