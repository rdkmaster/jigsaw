import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawSliderModule, JigsawViewportModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {BigRowDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawTableModule, JigsawSliderModule, JigsawDemoDescriptionModule, JigsawViewportModule
    ],
    declarations: [
        BigRowDemoComponent,
    ],
    exports: [BigRowDemoComponent],
})
export class BigRowDemoModule {
}
