import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BoxJustifyDemoComponent} from "./box-justify/app.component";
import {BoxLayoutDemoComponent} from "./box-layout/app.component";
import {BoxJustifyDemoModule} from "./box-justify/app.module";
import {BoxLayoutDemoModule} from "./box-layout/app.module";
import {FormDemoComponent} from "./form/app.component";
import {FormDemoModule} from "./form/app.module";
import {BoxLayoutScrollDemoComponent} from "./box-layout-scroll/app.component";
import {BoxLayoutScrollDemoModule} from "./box-layout-scroll/app.module";
import {customSceneLayoutDemoComponent} from "app/demo/layout/custom-scene-layout/app.component";
import {customSceneLayoutDemoModule} from "./custom-scene-layout/app.module";

export const routerConfig = [
    {
        path: 'box-justify', component: BoxJustifyDemoComponent
    },
    {
        path: 'box-layout', component: BoxLayoutDemoComponent
    },
    {
        path: 'form', component: FormDemoComponent
    },
    {
        path: 'box-layout-scroll', component: BoxLayoutScrollDemoComponent
    },
    {
        path: 'custom-scene-layout', component: customSceneLayoutDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        BoxJustifyDemoModule,
        BoxLayoutDemoModule,
        FormDemoModule,
        BoxLayoutScrollDemoModule,
        customSceneLayoutDemoModule,
    ]
})
export class LayoutDemoModule {
}
