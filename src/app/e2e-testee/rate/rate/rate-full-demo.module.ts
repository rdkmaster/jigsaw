import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RateDemoComponent} from "./rate-full-demo.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [RateDemoComponent],
    bootstrap: [RateDemoComponent],
})
export class RateFullDemoModule {
}
