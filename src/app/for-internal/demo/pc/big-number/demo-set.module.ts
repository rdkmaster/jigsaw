import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BigNumberCommonDemoComponent} from "./common/demo.component";
import {BigNumberCommonDemoModule} from "./common/demo.module";

export const routerConfig = [
    {
        path: 'common-big-number', component: BigNumberCommonDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), BigNumberCommonDemoModule
    ]
})
export class BigNumberDemoModule {
}
