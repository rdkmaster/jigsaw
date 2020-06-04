import {NgModule} from '@angular/core';
import {JigsawSliderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SliderVerticalDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawSliderModule, JigsawDemoDescriptionModule],
    declarations: [SliderVerticalDemoComponent],
    exports: [SliderVerticalDemoComponent]
})
export class SliderVerticalDemoModule {
}
