/**
 * Created by 10177553 on 2017/4/10.
 */
import { NgModule } from '@angular/core';
import {RdkDropDown} from "./dropdown";
import {CommonModule} from "@angular/common";


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [RdkDropDown],
    declarations: [RdkDropDown],
    providers: [],
})
export class RdkDropDownModuleModule { }
