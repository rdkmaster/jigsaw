import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TimeSectionBasicDemoComponent} from "./basic/demo.component";
import {TimeSectionBasicDemoModule} from "./basic/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: TimeSectionBasicDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TimeSectionBasicDemoModule,
    ]
})
export class TimeSectionDemoModule {
}
