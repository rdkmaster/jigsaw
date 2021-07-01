import {NgModule} from '@angular/core';
import {JigsawMobileSliderModule, JigsawMobileSwitchModule, JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SliderUpdateDemoComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawMobileSwitchModule, JigsawMobileSliderModule, JigsawDemoDescriptionModule, JigsawMobileButtonModule, JigsawHeaderModule],
    declarations: [SliderUpdateDemoComponent],
    exports: [SliderUpdateDemoComponent]
})
export class SliderUpdateDemoModule {
}
