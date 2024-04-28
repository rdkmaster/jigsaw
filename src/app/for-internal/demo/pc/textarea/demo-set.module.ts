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
import {TextareaMaxLengthDemoModule} from "./max-length/demo.module";
import {TextareaMaxLengthDemoComponent} from "./max-length/demo.component";
import { TextareaResizeDemoComponent } from './resize/demo.component';
import { TextareaResizeDemoModule } from './resize/demo.module';
import { TextareaShowBorderDemoComponent } from "./show-border/demo.component";
import { TextareaShowBorderDemoModule } from "./show-border/demo.module";
import {TextareaAutoHeightComponent} from "./auto-height/demo.component";
import {TextareaAutoHeightModule} from "./auto-height/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: TextareaBasicDemoComponent
    },
    {
        path: 'show-border', component: TextareaShowBorderDemoComponent
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
    },
    {
        path: 'max-length', component: TextareaMaxLengthDemoComponent
    },
    {
        path: 'resize', component: TextareaResizeDemoComponent
    },
    {
        path: 'auto-height', component: TextareaAutoHeightComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TextareaBasicDemoModule,
        TextareaShowBorderDemoModule,
        TextareaValueChangeDemoModule,
        TextareaClearableDemoModule,
        TextareaFocusDemoModule,
        TextareaDisabledModule,
        TextareaValidModule,
        TextareaSelectDemoModule,
        TextareaMaxLengthDemoModule,
        TextareaResizeDemoModule,
        TextareaAutoHeightModule,
    ]
})
export class TextareaDemoModule {
}
