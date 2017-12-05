import {NgModule} from '@angular/core';
import {JigsawSliderModule} from "jigsaw/component/slider/index";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SliderBasicDemoComponent} from './app.component';

@NgModule({
    imports: [JigsawSwitchModule, JigsawSliderModule, JigsawDemoDescriptionModule],
    declarations: [SliderBasicDemoComponent],
    exports: [SliderBasicDemoComponent]
})
export class SliderBasicDemoModule {
}
