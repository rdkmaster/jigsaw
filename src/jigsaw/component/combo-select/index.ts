import { NgModule } from '@angular/core';
import {JigsawComboSelect} from "./combo-select";
import {CommonModule} from "@angular/common";
import {JigsawTagModule} from "../tag/tag";
import {PopupService} from "../../service/popup.service";
import {JigsawInputModule} from "../input/input";

@NgModule({
    imports: [
        CommonModule,
        JigsawTagModule,
        JigsawInputModule
    ],
    exports: [JigsawComboSelect],
    declarations: [JigsawComboSelect],
    providers: [PopupService],
})
export class JigsawComboSelectModule { }

export * from './combo-select';
