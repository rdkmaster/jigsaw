/**
 * Created by 10177553 on 2017/4/13.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {JigsawSlider, JigsawSliderHandle} from './slider';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [JigsawSlider],
    declarations: [JigsawSlider,JigsawSliderHandle],
    providers: [],
})
export class JigsawSliderModule { }

export * from './slider';
