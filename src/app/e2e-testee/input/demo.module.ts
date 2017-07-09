

import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawButtonModule} from "jigsaw/component/button/button";

import {InputBasicDemoComponent} from "./basic/basic";
import {InputValueChangeDemoComponent} from "./valueChange/valueChange";
import {InputClearableDemoComponent} from "./clearable/clearable";
import {InputFocusDemoComponent} from "./focus/focus";
import {InputPrefixIconDemoComponent} from "./prefixIcon/prefixIcon";


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
    },
    {
        path:'**', //fallback router must in the last
        component: InputBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        InputBasicDemoComponent,InputValueChangeDemoComponent,InputClearableDemoComponent
        ,InputFocusDemoComponent,InputPrefixIconDemoComponent
    ],
    imports: [
        RouterModule.forChild(inputDemoRoutes), JigsawInputModule,JigsawButtonModule
    ],
    exports: [
        InputBasicDemoComponent
    ],
    providers: []
})
export class InputDemoModule { }
