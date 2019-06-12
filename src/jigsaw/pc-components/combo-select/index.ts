import {NgModule} from '@angular/core';
import {JigsawComboSelect} from "./combo-select";
import {CommonModule} from "@angular/common";
import {JigsawTagModule} from "../tag/tag";
import {JigsawInputModule} from "../input/input";
import {JigsawFloatModule} from "../../common/directive/float/index";
import {PopupService} from "../../common/service/popup.service";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

@NgModule({
    imports: [
        CommonModule,
        JigsawTagModule,
        JigsawInputModule,
        JigsawFloatModule,
        PerfectScrollbarModule
    ],
    exports: [JigsawComboSelect],
    declarations: [JigsawComboSelect],
    providers: [PopupService]
})
export class JigsawComboSelectModule {
}

export * from './combo-select';
