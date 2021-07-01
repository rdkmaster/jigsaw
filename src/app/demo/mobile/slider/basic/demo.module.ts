import {NgModule} from '@angular/core';
import {JigsawMobileSliderModule, JigsawMobileSwitchModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SliderBasicDemoComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawMobileSwitchModule, JigsawMobileSliderModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [SliderBasicDemoComponent],
    exports: [SliderBasicDemoComponent]
})
export class SliderBasicDemoModule {
}
