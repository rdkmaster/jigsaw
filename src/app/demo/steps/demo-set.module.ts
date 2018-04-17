import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {StepsHorizontalBasicModule} from "./basic/demo.module";
import {StepsClickChangeStatusModule} from "./click-change-status/demo.module";
import {StepsVerticalModule} from "./vertical/demo.module";
import {StepsHorizontalBasicComponent} from "./basic/demo.component";
import {StepsVerticalFullComponent} from "./vertical/demo.component";
import {StepsClickChangeStatusComponent} from "./click-change-status/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: StepsHorizontalBasicComponent,
    },
    {
        path: 'vertical', component: StepsVerticalFullComponent,

    },
    {
        path: 'click-change-status', component: StepsClickChangeStatusComponent
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
