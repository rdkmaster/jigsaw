/**
 * Created by 10177553 on 2017/4/10.
 */

import { NgModule } from '@angular/core';

import {RdkDropDownInput} from "./basic/basic";
import {RouterModule} from "@angular/router";
import {RdkDropDownModule} from "../../../../component/dropdown/index";
import {DropDownMultipleDemo} from "./multiple/multiple";
import {RdkTileSelectModule} from "../../../../component/tile-select/tile-select";

const routes = [
    {
        path: 'basic', component:RdkDropDownInput
    },
    {
        path: 'multiple', component:DropDownMultipleDemo
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RdkDropDownModule,
        RdkTileSelectModule],
    exports: [RdkDropDownInput, DropDownMultipleDemo],
    declarations: [RdkDropDownInput,DropDownMultipleDemo],
    providers: [],
})
export class DropDownDemoModule { }
