import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ColorPickerModule} from "ngx-color-picker";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {JigsawButtonModule} from "../button/button";
import {JigsawFloatModule} from "../../common/directive/float/float";
import {JigsawColorSelect} from "./color-select";
import {TranslateHelper} from "../../common/core/utils/translate-helper";

@NgModule({
    imports: [
        CommonModule, JigsawButtonModule, ColorPickerModule, JigsawFloatModule, TranslateModule.forChild(), PerfectScrollbarModule
    ],
    declarations: [JigsawColorSelect],
    exports: [JigsawColorSelect]
})
export class JigsawColorSelectModule {
    constructor() {
        TranslateHelper.initI18n('color', {
            zh: {
                confirm: "确定",
                cancel: '取消'
            },
            en: {
                confirm: 'Confirm',
                cancel: 'Cancel'
            }
        });
    }
}

export * from "./color-select";
