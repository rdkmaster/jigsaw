/**
 * Created by 10177553 on 2017/4/13.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {JigsawSlider, JigsawSliderHandle} from './slider';
import {JigsawTooltipModule} from "../../common/directive/tooltip/tooltip";

@NgModule({
    imports: [
        CommonModule, JigsawTooltipModule
    ],
    exports: [JigsawSlider],
    declarations: [JigsawSlider,JigsawSliderHandle],
    providers: [],
})
export class JigsawSliderModule { }

export * from './slider';
