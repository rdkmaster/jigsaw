import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {InputBasicDemoModule} from "./basic/app.module";
import {InputValueChangeDemoModule} from "./value-change/app.module";
import {InputClearableDemoModule} from "./clearable/app.module";
import {InputFocusDemoModule} from "./focus/app.module";
import {InputPrefixIconDemoModule} from "./prefix-icon/app.module";
import {InputFullModule} from "./full/app.module";

import {InputFullComponent} from "./full/app.component";
import {InputBasicDemoComponent} from "./basic/app.component";
import {InputValueChangeDemoComponent} from "./value-change/app.component";
import {InputClearableDemoComponent} from "./clearable/app.component";
import {InputFocusDemoComponent} from "./focus/app.component";
import {InputPrefixIconDemoComponent} from "./prefix-icon/app.component";

export const routerConfig = [
    {
        path: 'full', component: InputFullComponent, recommended: true
    },
    {
        path: 'basic', component: InputBasicDemoComponent
    },
    {
        path: 'valueChange', component: InputValueChangeDemoComponent
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
