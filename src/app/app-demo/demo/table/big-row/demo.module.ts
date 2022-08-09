import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawSliderModule, JigsawViewportModule} from "jigsaw/public_api";

import {BigRowDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawTableModule, JigsawSliderModule,  JigsawViewportModule
    ],
    declarations: [
        BigRowDemoComponent,
    ],
    exports: [BigRowDemoComponent],
})
export class BigRowDemoModule {
}
