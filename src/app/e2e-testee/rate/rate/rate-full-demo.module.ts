import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RateDemoComponent} from "./rate-full-demo.component";
import {JigsawRateModule} from "../../../../jigsaw/component/rate/rate.module";

@NgModule({
    imports: [
        CommonModule,
        JigsawRateModule
    ],
    declarations: [RateDemoComponent],
    bootstrap: [RateDemoComponent],
})
export class RateFullDemoModule {
}
