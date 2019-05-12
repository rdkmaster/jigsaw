import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TextareaBasicDemoModule} from "./basic/demo.module";
import {TextareaValueChangeDemoModule} from "./value-change/demo.module";
import {TextareaClearableDemoModule} from "./clearable/demo.module";
import {TextareaFocusDemoModule} from "./focus/demo.module";
import {TextareaDisabledModule} from "./disabled/demo.module";
import {TextareaValidModule} from "./valid/demo.module";
import {TextareaSelectDemoModule} from "./select/demo.module";

import {TextareaBasicDemoComponent} from "./basic/demo.component";
import {TextareaValueChangeDemoComponent} from "./value-change/demo.component";
import {TextareaClearableDemoComponent} from "./clearable/demo.component";
import {TextareaFocusDemoComponent} from "./focus/demo.component";
import {TextareaDisabledComponent} from "./disabled/demo.component";
import {TextareaValidComponent} from "./valid/demo.component";
import {TextareaSelectDemoComponent} from "./select/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: TextareaBasicDemoComponent
    },
    {
        path: 'value-change', component: TextareaValueChangeDemoComponent
    },
    {
        path: 'clearable', component: TextareaClearableDemoComponent
    },
    {
        path: 'focus', component: TextareaFocusDemoComponent
    },
    {
        path: 'disabled', component: TextareaDisabledComponent
    },
    {
        path: 'valid', component: TextareaValidComponent
    },
    {
        path: 'select', component: TextareaSelectDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TextareaBasicDemoModule,
        TextareaValueChangeDemoModule,
        TextareaClearableDemoModule,
        TextareaFocusDemoModule,
        TextareaDisabledModule,
        TextareaValidModule,
        TextareaSelectDemoModule
    ]
})
export class TextareaDemoModule {
}
