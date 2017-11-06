import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RateFullComponent} from './app.component';
import {JigsawRateModule} from "../../../../jigsaw/component/rate/rate.module";

@NgModule({
    imports: [
        CommonModule,
        JigsawRateModule
    ],
    declarations: [RateFullComponent],
    bootstrap: [ RateFullComponent ],
})
export class RateFullModule {
}
