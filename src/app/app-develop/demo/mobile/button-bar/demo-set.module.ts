import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ButtonBarBasicDemoComponent} from "./basic/demo.component";
import {ButtonBarBasicDemoModule} from "./basic/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: ButtonBarBasicDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ButtonBarBasicDemoModule
    ]
})
export class ButtonBarMobileDemoModule { }
