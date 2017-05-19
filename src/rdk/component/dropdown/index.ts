import { NgModule } from '@angular/core';
import {RdkComboSelect} from "./combo-select";
import {CommonModule} from "@angular/common";
import {RdkTagModule} from "../tag/tag";

@NgModule({
    imports: [
        CommonModule,
        RdkTagModule
    ],
    exports: [RdkComboSelect],
    declarations: [RdkComboSelect],
    providers: [],
})
export class RdkComboSelectModule { }
