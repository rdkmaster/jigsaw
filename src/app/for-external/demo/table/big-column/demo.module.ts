import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawSliderModule, JigsawViewportModule} from "jigsaw/public_api";

import {BigColumnDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawTableModule, JigsawSliderModule,  JigsawViewportModule
    ],
    declarations: [
        BigColumnDemoComponent,
    ],
    exports: [BigColumnDemoComponent],
})
export class BigColumnDemoModule {
}
