import { NgModule } from '@angular/core';
import { JigsawSliderModule } from "jigsaw/component/slider/index";
import { SliderVerticalDemoComponent }  from './app.component';

@NgModule({
    imports: [ JigsawSliderModule ],
    declarations: [ SliderVerticalDemoComponent ],
    bootstrap: [ SliderVerticalDemoComponent ]
})
export class SliderVerticalDemoModule {}
