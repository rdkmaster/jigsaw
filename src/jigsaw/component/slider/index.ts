/**
 * Created by 10177553 on 2017/4/13.
 */
import { NgModule } from '@angular/core';

import { JigsawSlider } from './slider';
import {CommonModule} from "@angular/common";
import {JigsawSliderHandle} from "./handle";

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
