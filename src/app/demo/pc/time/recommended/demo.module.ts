import {NgModule} from '@angular/core';
import {JigsawTimeModule} from "jigsaw/pc-components/time/index";
import {TimeRecommendedComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTimeModule, JigsawDemoDescriptionModule],
    declarations: [TimeRecommendedComponent],
    exports: [TimeRecommendedComponent]
})
export class TimeRecommendedDemoModule {
}
