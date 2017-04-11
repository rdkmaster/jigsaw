/**
 * Created by 10177553 on 2017/4/10.
 */

import { NgModule } from '@angular/core';

import {RdkDropDownInput} from "./basic/basic";
import {RouterModule} from "@angular/router";
import {RdkDropDownModuleModule} from "../../../../component/dropdown/index";

const routes = [
    {
        path: 'basic', component:RdkDropDownInput
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RdkDropDownModuleModule],
    exports: [RdkDropDownInput],
    declarations: [RdkDropDownInput],
    providers: [],
})
export class DropDownDemoModule { }
