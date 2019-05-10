import {NgModule} from '@angular/core';
import {JigsawMobileSliderModule} from "jigsaw/mobile-components/slider/index";
import {JigsawMobileSwitchModule} from "jigsaw/mobile-components/switch/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SliderBasicDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawMobileSwitchModule, JigsawMobileSliderModule, JigsawDemoDescriptionModule],
    declarations: [SliderBasicDemoComponent],
    exports: [SliderBasicDemoComponent]
})
export class SliderBasicDemoModule {
}
