import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ColorPickerModule} from "ngx-color-picker";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {InternalUtils} from "../../common/core/utils/internal-utils";
import {JigsawButtonModule} from "../button/button";
import {JigsawFloatModule} from "../../common/directive/float/float";
import {JigsawColorSelect} from "./color-select";

@NgModule({
    imports: [
        CommonModule, JigsawButtonModule, ColorPickerModule, JigsawFloatModule, TranslateModule, PerfectScrollbarModule
    ],
    declarations: [JigsawColorSelect],
    exports: [JigsawColorSelect],
    providers:[TranslateService]
})
export class JigsawColorSelectModule {
    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, 'color', {
            zh: {
                confirm: "确定",
                cancel: '取消'
            },
            en: {
                confirm: 'Confirm',
                cancel: 'Cancel'
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
    }
}

export * from "./color-select";
