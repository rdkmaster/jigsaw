import {NgModule} from '@angular/core';
import {JigsawTimeModule} from "jigsaw/component/time/index";
import {TimeBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawButtonModule} from "jigsaw/component/button/button";

@NgModule({
    imports: [JigsawTimeModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    declarations: [TimeBasicDemoComponent],
    exports: [TimeBasicDemoComponent]
})
export class TimeBasicDemoModule {
}
