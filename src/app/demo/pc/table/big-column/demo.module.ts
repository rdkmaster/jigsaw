import {NgModule} from '@angular/core';
import {JigsawTableModule, JigsawSliderModule, JigsawViewportModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BigColumnDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawTableModule, JigsawSliderModule, JigsawDemoDescriptionModule, JigsawViewportModule
    ],
    declarations: [
        BigColumnDemoComponent,
    ],
    exports: [BigColumnDemoComponent],
})
export class BigColumnDemoModule {
}
