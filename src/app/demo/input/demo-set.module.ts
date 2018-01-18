import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {InputBasicDemoModule} from "./basic/demo.module";
import {InputValueChangeDemoModule} from "./value-change/demo.module";
import {InputClearableDemoModule} from "./clearable/demo.module";
import {InputFocusDemoModule} from "./focus/demo.module";
import {InputPrefixIconDemoModule} from "./prefix-icon/demo.module";
import {InputFullModule} from "./full/demo.module";

import {InputFullComponent} from "./full/demo.component";
import {InputBasicDemoComponent} from "./basic/demo.component";
import {InputValueChangeDemoComponent} from "./value-change/demo.component";
import {InputClearableDemoComponent} from "./clearable/demo.component";
import {InputFocusDemoComponent} from "./focus/demo.component";
import {InputPrefixIconDemoComponent} from "./prefix-icon/demo.component";

export const routerConfig = [
    {
        path: 'full', component: InputFullComponent, recommended: true
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
        path: 'prefix-icon', component: InputPrefixIconDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        InputBasicDemoModule,
        InputValueChangeDemoModule,
        InputClearableDemoModule,
        InputFocusDemoModule,
        InputPrefixIconDemoModule,
        InputFullModule
    ]
})
export class InputDemoModule {
}
