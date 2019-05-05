import {NgModule} from '@angular/core';
import {JigsawTimeModule} from "jigsaw/pc-components/time/index";
import {TimeBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";

@NgModule({
    imports: [JigsawTimeModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    declarations: [TimeBasicDemoComponent],
    exports: [TimeBasicDemoComponent]
})
export class TimeBasicDemoModule {
}
