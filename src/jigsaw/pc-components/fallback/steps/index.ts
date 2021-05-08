/**
 * Created by 10238397 on 2018/4/16.
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawStepsFallback } from "./steps";
import { JigsawStepItemFallback } from "./step-item";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

@NgModule({
    imports: [CommonModule, PerfectScrollbarModule],
    declarations: [JigsawStepsFallback, JigsawStepItemFallback],
    exports: [JigsawStepsFallback, JigsawStepItemFallback]
})
export class JigsawStepsFallbackModule {}

export * from "./steps";
export * from "./step-item";
