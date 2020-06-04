import {NgModule} from '@angular/core';
import {JigsawTimeModule, JigsawButtonModule} from "jigsaw/public_api";
import {TimeBasicDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTimeModule, JigsawDemoDescriptionModule, JigsawButtonModule],
    declarations: [TimeBasicDemoComponent],
    exports: [TimeBasicDemoComponent]
})
export class TimeBasicDemoModule {
}
