import {NgModule} from '@angular/core';
import {JigsawButtonModule, JigsawSliderModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SliderMultiValueComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawSwitchModule, JigsawSliderModule, JigsawButtonModule, JigsawDemoDescriptionModule, JigsawHeaderModule],
    declarations: [SliderMultiValueComponent],
    exports: [SliderMultiValueComponent]
})
export class SliderMultiValueDemoModule {
}
