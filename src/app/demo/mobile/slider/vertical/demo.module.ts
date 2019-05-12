import {NgModule} from '@angular/core';
import {JigsawMobileSliderModule} from "jigsaw/mobile-components/slider/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SliderVerticalDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawMobileSliderModule, JigsawDemoDescriptionModule],
    declarations: [SliderVerticalDemoComponent],
    exports: [SliderVerticalDemoComponent]
})
export class SliderVerticalDemoModule {
}
