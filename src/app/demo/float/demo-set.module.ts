import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FloatBasicModule} from "./basic/demo.module";
import {FloatBasicComponent} from "./basic/demo.component";
import {FloatTriggerDemoModule} from "./trigger/demo.module";
import {FloatTriggerDemo} from "./trigger/demo.component";
import {FloatPositionDemoModule} from "./position/demo.module";
import {FloatPositionDemo} from "./position/demo.component";
import {FloatTargetDemo} from "./target/demo.component";
import {FloatTargetDemoModule} from "./target/demo.module";
import {FloatOptionDemo} from "./option/demo.component";
import {FloatOptionDemoModule} from "./option/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: FloatBasicComponent
    },
    {
        path: 'trigger', component: FloatTriggerDemo
    },
    {
        path: 'position', component: FloatPositionDemo
    },
    {
        path: 'target', component: FloatTargetDemo
    },
    {
        path: 'option', component: FloatOptionDemo
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        FloatBasicModule, FloatTriggerDemoModule, FloatPositionDemoModule, FloatTargetDemoModule, FloatOptionDemoModule
    ]
})
export class FloatDemoModule {
}
