import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {InternalUtils} from "../../common/core/utils/internal-utils";
import {JigsawButtonModule} from "../button/button";
import {JigsawFloatModule} from "../../common/directive/float/index";
import {JigsawColorSelect} from "./color-select";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ColorPickerModule} from "ngx-color-picker";

@NgModule({
    imports: [
        CommonModule, JigsawButtonModule, ColorPickerModule, JigsawFloatModule, TranslateModule
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
