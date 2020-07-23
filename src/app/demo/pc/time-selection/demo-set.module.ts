import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TimeSelectionBasicDemoComponent} from "./basic/demo.component";
import {TimeSelectionBasicDemoModule} from "./basic/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: TimeSelectionBasicDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TimeSelectionBasicDemoModule,
    ]
})
export class TimeSelectionDemoModule {
}
