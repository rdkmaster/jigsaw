/**
 * Created by 10177553 on 2017/4/13.
 */
import { NgModule } from '@angular/core';

import { RdkSlider } from './slider';
import {CommonModule} from "@angular/common";
import {SliderHandle} from "./handle";

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [RdkSlider],
    declarations: [RdkSlider,SliderHandle],
    providers: [],
})
export class RdkSliderModule { }

export * from './slider';
