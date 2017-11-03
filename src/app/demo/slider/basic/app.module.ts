import { NgModule } from '@angular/core';
import { JigsawSliderModule } from "jigsaw/component/slider/index";
import { JigsawSwitchModule } from "jigsaw/component/switch/index";
import { SliderBasicDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawSwitchModule, JigsawSliderModule ],
    declarations: [ SliderBasicDemoComponent ],
    bootstrap: [ SliderBasicDemoComponent ]
})
export class SliderBasicDemoModule {}
