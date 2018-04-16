import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {StepsBasicDemoModule} from "./basic/demo.module";

import {StepsBasicDemoComponent} from "./basic/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: StepsBasicDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        StepsBasicDemoModule
    ]
})
export class StepsDemoModule{

}
