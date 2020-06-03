import {NgModule} from '@angular/core';
import {JigsawMobileSliderModule, JigsawMobileSwitchModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SliderBasicDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawMobileSwitchModule, JigsawMobileSliderModule, JigsawDemoDescriptionModule],
    declarations: [SliderBasicDemoComponent],
    exports: [SliderBasicDemoComponent]
})
export class SliderBasicDemoModule {
}
