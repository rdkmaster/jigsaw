import {NgModule} from '@angular/core';
import {JigsawComboSelect} from "./combo-select";
import {CommonModule} from "@angular/common";
import {JigsawTagModule} from "../tag/tag";
import {JigsawInputModule} from "../input/input";
import {JigsawFloatModule} from "../../directive/float";

@NgModule({
    imports: [
        CommonModule,
        JigsawTagModule,
        JigsawInputModule,
        JigsawFloatModule
    ],
    exports: [JigsawComboSelect],
    declarations: [JigsawComboSelect]
})
export class JigsawComboSelectModule {
}

export * from './combo-select';
