/**
 * Created by 10177553 on 2018/4/16.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {JigsawSteps} from './steps';
import {JigsawStepItem} from './step-item';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [JigsawSteps,JigsawStepItem],
    exports: [JigsawSteps,JigsawStepItem],
})
export class JigsawStepsModule { }
