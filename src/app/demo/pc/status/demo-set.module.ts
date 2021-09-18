import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StatusBasicDemoModule } from "./basic/demo.module";
import { StatusBasicDemoComponent } from "./basic/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: StatusBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        StatusBasicDemoModule
    ]
})
export class SwitchDemoModule { }
