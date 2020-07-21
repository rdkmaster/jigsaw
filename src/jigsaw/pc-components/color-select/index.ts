import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from '@angular/forms';
import {JigsawButtonModule} from "../button/button";
import {JigsawFloatModule} from "../../common/directive/float";
import {ColorPickerModule} from "ngx-color-picker";
import {JigsawColorSelect} from "./color-select";
import {InternalUtils} from "../../common/core/utils/internal-utils";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule, FormsModule, JigsawButtonModule, ColorPickerModule, JigsawFloatModule, TranslateModule
    ],
    declarations: [JigsawColorSelect],
    exports: [JigsawColorSelect]
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
