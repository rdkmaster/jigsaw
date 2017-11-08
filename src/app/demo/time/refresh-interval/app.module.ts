import {NgModule} from '@angular/core';
import {JigsawTimeModule} from "jigsaw/component/time/index";
import {TimeRefreshIntervalComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTimeModule, JigsawDemoDescriptionModule],
    declarations: [TimeRefreshIntervalComponent],
    bootstrap: [TimeRefreshIntervalComponent]
})
export class TimeRrefreshIntervalDemoModule {
}
