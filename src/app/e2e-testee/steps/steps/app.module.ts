import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsDemoComponent } from "./app.component";
import { JigsawRateModule } from "../../../../jigsaw/component/rate/rate.module";

@NgModule({
    imports: [
        CommonModule,
        JigsawRateModule
    ],
    declarations: [StepsDemoComponent],
    bootstrap: [StepsDemoComponent],
})
export class StepsFullDemoModule {
}
