import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BoxJustifyDemoComponent} from "./box-justify/demo.component";
import {BoxLayoutDemoComponent} from "./box-layout/demo.component";
import {BoxJustifyDemoModule} from "./box-justify/demo.module";
import {BoxLayoutDemoModule} from "./box-layout/demo.module";
import {FormDemoComponent} from "./form/demo.component";
import {FormDemoModule} from "./form/demo.module";
import {BoxLayoutScrollDemoComponent} from "./box-layout-scroll/demo.component";
import {BoxLayoutScrollDemoModule} from "./box-layout-scroll/demo.module";
import {CustomSceneLayoutDemoComponent} from "app/demo/layout/custom-scene-layout/demo.component";
import {CustomSceneLayoutDemoModule} from "./custom-scene-layout/demo.module";
import {SetResizeLineWidthDemoComponent} from "./set-resize-line-width/demo.component";
import {SetResizeLineWidthDemoModule} from "./set-resize-line-width/demo.module";
import {EditableDemoComponent} from "./editable/demo.component";
import {EditableDemoModule} from "./editable/demo.module";
import {MonitorComponent} from "./monitor/demo.component";
import {MonitorModule} from "./monitor/demo.module";

export const routerConfig = [
    {
        path: 'monitor', component: MonitorComponent
    },
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
        path: 'custom-scene-layout', component: CustomSceneLayoutDemoComponent
    },
    {
        path: 'set-resize-line-width', component: SetResizeLineWidthDemoComponent
    },
    {
        path: 'editable', component: EditableDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        MonitorModule,
        BoxJustifyDemoModule,
        BoxLayoutDemoModule,
        FormDemoModule,
        BoxLayoutScrollDemoModule,
        CustomSceneLayoutDemoModule,
        SetResizeLineWidthDemoModule,
        EditableDemoModule
    ]
})
export class LayoutDemoModule {
}
