import {NgModule} from '@angular/core';
import {JigsawSliderModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {SliderUpdateDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawSwitchModule, JigsawSliderModule, JigsawDemoDescriptionModule],
    declarations: [SliderUpdateDemoComponent],
    exports: [SliderUpdateDemoComponent]
})
export class SliderUpdateDemoModule {
}
