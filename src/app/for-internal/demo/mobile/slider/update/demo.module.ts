import {NgModule} from '@angular/core';
import {JigsawMobileSliderModule, JigsawMobileSwitchModule, JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {SliderUpdateDemoComponent} from './demo.component';

import {JigsawMobileHeaderModule} from "jigsaw/mobile_public_api";

@NgModule({
    imports: [JigsawMobileSwitchModule, JigsawMobileSliderModule, JigsawDemoDescriptionModule, JigsawMobileButtonModule, JigsawMobileHeaderModule],
    declarations: [SliderUpdateDemoComponent],
    exports: [SliderUpdateDemoComponent]
})
export class SliderUpdateDemoModule {
}
