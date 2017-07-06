import { NgModule } from '@angular/core';
import {JigsawComboSelect} from "./combo-select";
import {CommonModule} from "@angular/common";
import {JigsawTagModule} from "../tag/tag";

@NgModule({
    imports: [
        CommonModule,
        JigsawTagModule
    ],
    exports: [JigsawComboSelect],
    declarations: [JigsawComboSelect],
    providers: [],
})
export class JigsawComboSelectModule { }

export * from './combo-select';
