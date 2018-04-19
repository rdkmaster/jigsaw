/**
 * Created by 10238397 on 2018/4/16.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawSteps} from './steps';
import {JigsawStepItem} from './step-item';
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

@NgModule({
    imports: [
        CommonModule,PerfectScrollbarModule
    ],
    declarations: [JigsawSteps, JigsawStepItem],
    exports: [JigsawSteps, JigsawStepItem],
})
export class JigsawStepsModule {
}
