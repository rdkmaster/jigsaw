
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
import {InputLiveDemoComponent} from "../../live-demo/input/app.component";
import {InputLiveDemoModule} from "../../live-demo/input/app.module";

const inputDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: InputBasicDemoComponent
    },{
        path:'valueChange', component: InputValueChangeDemoComponent
    },{
        path:'clearable', component: InputClearableDemoComponent
    },{
        path:'focus', component: InputFocusDemoComponent
    },{
        path:'prefixIcon', component: InputPrefixIconDemoComponent
    },{
        path:'live-demo', component: InputLiveDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: InputBasicDemoComponent
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
        InputLiveDemoModule
    ]
})
export class InputDemoModule { }
