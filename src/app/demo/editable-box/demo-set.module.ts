import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CustomSceneLayoutDemoComponent} from "./custom-scene-layout/demo.component";
import {CustomSceneLayoutDemoModule} from "./custom-scene-layout/demo.module";
import {SetResizeLineWidthDemoComponent} from "./set-resize-line-width/demo.component";
import {SetResizeLineWidthDemoModule} from "./set-resize-line-width/demo.module";
import {EditableDemoComponent} from "./editable/demo.component";
import {EditableDemoModule} from "./editable/demo.module";
import {MonitorComponent} from "./monitor/demo.component";
import {MonitorModule} from "./monitor/demo.module";

export const routerConfig = [
    {
        path: 'custom-scene-layout', component: CustomSceneLayoutDemoComponent
    },
    {
        path: 'editable', component: EditableDemoComponent
    },
    {
        path: 'monitor', component: MonitorComponent
    },
    {
        path: 'set-resize-line-width', component: SetResizeLineWidthDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        MonitorModule,
        CustomSceneLayoutDemoModule,
        SetResizeLineWidthDemoModule,
        EditableDemoModule
    ]
})
export class EditableBoxDemoModule {
}
