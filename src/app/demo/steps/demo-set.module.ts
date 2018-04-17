import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {StepsHorizontalBasicModule} from "./basic/demo.module";
import {StepsClickChangeStatusModule} from "./step-interactive/demo.module";
import {StepsVerticalModule} from "./vertical/demo.module";
import {StepsHorizontalBasicComponent} from "./basic/demo.component";
import {StepsVerticalFullComponent} from "./vertical/demo.component";
import {StepsClickChangeStatusComponent} from "./step-interactive/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: StepsHorizontalBasicComponent,
    },
    {
        path: 'vertical', component: StepsVerticalFullComponent,

    },
    {
        path: 'step-interactive', component: StepsClickChangeStatusComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        StepsHorizontalBasicModule,
        StepsClickChangeStatusModule,
        StepsVerticalModule
    ]
})
export class StepsDemoModule {

}
