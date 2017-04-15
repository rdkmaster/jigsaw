/**
 * Created by 10177553 on 2017/4/13.
 */
import { NgModule } from '@angular/core';

import { RdkSlider } from './slider';
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [RdkSlider],
    declarations: [RdkSlider],
    providers: [],
})
export class RdkSliderModule { }
