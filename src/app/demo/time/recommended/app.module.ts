import {NgModule} from '@angular/core';
import {JigsawTimeModule} from "jigsaw/component/time/index";
import {TimeRecommendedComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTimeModule, JigsawDemoDescriptionModule],
    declarations: [TimeRecommendedComponent],
    exports: [TimeRecommendedComponent]
})
export class TimeRecommendedDemoModule {
}
