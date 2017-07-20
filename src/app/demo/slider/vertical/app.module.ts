import { NgModule } from '@angular/core';
import { JigsawSliderModule } from "jigsaw/component/slider/index";
import { SliderVerticalDemo }  from './app.component';

@NgModule({
    imports: [ JigsawSliderModule ],
    declarations: [ SliderVerticalDemo ],
    bootstrap: [ SliderVerticalDemo ]
})
export class SliderVerticalDemoModule {}
