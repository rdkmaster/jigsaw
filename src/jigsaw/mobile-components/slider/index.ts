/**
 * Created by 10177553 on 2017/4/13.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {JigsawMobileSlider, JigsawMobileSliderHandle} from './slider';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [JigsawMobileSlider],
    declarations: [JigsawMobileSlider,JigsawMobileSliderHandle],
    providers: [],
})
export class JigsawMobileSliderModule { }

export * from './slider';
