import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormDisplayCommonDemoComponent} from "./common/demo.component";
import {FormDisplayCommonDemoModule} from "./common/demo.module";

export const routerConfig = [
    {
        path: 'form-display', component: FormDisplayCommonDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), FormDisplayCommonDemoModule
    ]
})
export class FormDisplayDemoModule {
}
