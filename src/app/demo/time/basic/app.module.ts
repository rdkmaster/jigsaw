import {NgModule} from '@angular/core';
import {JigsawTimeModule} from "jigsaw/component/time/index";
import {TimeBasicDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTimeModule, JigsawDemoDescriptionModule],
    declarations: [TimeBasicDemoComponent],
    exports: [TimeBasicDemoComponent]
})
export class TimeBasicDemoModule {
}
