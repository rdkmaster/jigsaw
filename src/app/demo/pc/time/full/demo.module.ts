import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTimeModule} from "jigsaw/pc-components/time/index";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TimeFullComponent} from './demo.component';

@NgModule({
    imports: [CommonModule, JigsawTimeModule, JigsawRadioModule, JigsawDemoDescriptionModule],
    declarations: [TimeFullComponent],
    exports: [TimeFullComponent]
})
export class TimeFullModule {
}
