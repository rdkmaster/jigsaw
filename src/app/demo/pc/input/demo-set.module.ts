import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {InputBasicDemoModule} from "./basic/demo.module";
import {InputValueChangeDemoModule} from "./value-change/demo.module";
import {InputClearableDemoModule} from "./clearable/demo.module";
import {InputFocusDemoModule} from "./focus/demo.module";
import {InputPrefixIconDemoModule} from "./icons/demo.module";
import {InputFullModule} from "./full/demo.module";
import {InputDisabledModule} from "./disabled/demo.module";
import {InputValidModule} from "./valid/demo.module";
import {InputSelectDemoModule} from "./select/demo.module";

import {InputFullComponent} from "./full/demo.component";
import {InputBasicDemoComponent} from "./basic/demo.component";
import {InputValueChangeDemoComponent} from "./value-change/demo.component";
import {InputClearableDemoComponent} from "./clearable/demo.component";
import {InputFocusDemoComponent} from "./focus/demo.component";
import {InputPrefixIconDemoComponent} from "./icons/demo.component";
import {InputDisabledComponent} from "./disabled/demo.component";
import {InputValidComponent} from "./valid/demo.component";
import {InputSelectDemoComponent} from "./select/demo.component";
import {InputPasswordModule} from "./password/demo.module";
import {InputPasswordComponent} from "./password/demo.component";

export const routerConfig = [
    {
        path: 'full', component: InputFullComponent
    },
    {
        path: 'basic', component: InputBasicDemoComponent
    },
    {
        path: 'value-change', component: InputValueChangeDemoComponent
    },
    {
        path: 'clearable', component: InputClearableDemoComponent
    },
    {
        path: 'focus', component: InputFocusDemoComponent
    },
    {
        path: 'icons', component: InputPrefixIconDemoComponent
    },
    {
        path: 'disabled', component: InputDisabledComponent
    },
    {
        path: 'valid', component: InputValidComponent
    },
    {
        path: 'select', component: InputSelectDemoComponent
    },
    {
        path: 'password', component: InputPasswordComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        InputBasicDemoModule,
        InputValueChangeDemoModule,
        InputClearableDemoModule,
        InputFocusDemoModule,
        InputPrefixIconDemoModule,
        InputFullModule,
        InputDisabledModule,
        InputValidModule,
        InputSelectDemoModule,
        InputPasswordModule
    ]
})
export class InputDemoModule {
}
