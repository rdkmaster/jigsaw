import { NgModule } from '@angular/core';
import { JigsawSliderModule } from "jigsaw/component/slider/index";
import { JigsawSwitchModule } from "jigsaw/component/switch/index";
import { JigsawSliderDemoBasic }  from './app.component';

@NgModule({
    imports: [ JigsawSwitchModule, JigsawSliderModule ],
    declarations: [ JigsawSliderDemoBasic ],
    bootstrap: [ JigsawSliderDemoBasic ]
})
export class JigsawSliderDemoModule {}
