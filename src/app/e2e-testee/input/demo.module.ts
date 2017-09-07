import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {InputBasicDemoComponent} from "./basic/app.component";
import {InputValueChangeDemoComponent} from "./valueChange/app.component";
import {InputClearableDemoComponent} from "./clearable/app.component";
import {InputFocusDemoComponent} from "./focus/app.component";
import {InputPrefixIconDemoComponent} from "./prefixIcon/app.component";
import {InputBasicDemoModule} from "./basic/app.module";
import {InputValueChangeDemoModule} from "./valueChange/app.module";
import {InputClearableDemoModule} from "./clearable/app.module";
import {InputFocusDemoModule} from "./focus/app.module";
import {InputPrefixIconDemoModule} from "./prefixIcon/app.module";
import {InputFullComponent} from "../../live-demo/input/input-full/app.component";
import {InputFullModule} from "../../live-demo/input/input-full/app.module";

const inputDemoRoutes = [
    {
        path: 'input-full', component: InputFullComponent
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
        path: 'prefixIcon', component: InputPrefixIconDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: InputFullComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(inputDemoRoutes),
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
