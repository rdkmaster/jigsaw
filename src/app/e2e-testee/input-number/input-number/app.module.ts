import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputNumberDemoComponent} from "./app.component";
import {JigsawRateModule} from "../../../../jigsaw/component/rate/rate.module";

@NgModule({
    imports: [
        CommonModule,
        JigsawRateModule
    ],
    declarations: [InputNumberDemoComponent],
    bootstrap: [InputNumberDemoComponent],
})
export class InputNumberFullDemoModule {
}
