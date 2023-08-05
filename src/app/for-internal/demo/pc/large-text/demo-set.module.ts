import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LargeTextCommonDemoComponent} from "./common/demo.component";
import {LargeTextCommonDemoModule} from "./common/demo.module";

export const routerConfig = [
    {
        path: 'common-large-text', component: LargeTextCommonDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), LargeTextCommonDemoModule
    ]
})
export class LargeTextDemoModule {
}
