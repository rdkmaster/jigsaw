import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ProgressFullModule} from "./full/demo.module";
import {ProgressFullComponent} from "./full/demo.component";

export const routerConfig = [
    {
        path: 'full', component: ProgressFullComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ProgressFullModule
    ]
})
export class ProgressDemoModule {
}
