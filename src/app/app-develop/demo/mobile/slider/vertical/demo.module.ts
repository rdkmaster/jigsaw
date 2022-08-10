import {NgModule} from '@angular/core';
import {JigsawMobileSliderModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {SliderVerticalDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawMobileSliderModule, JigsawDemoDescriptionModule],
    declarations: [SliderVerticalDemoComponent],
    exports: [SliderVerticalDemoComponent]
})
export class SliderVerticalDemoModule {
}
