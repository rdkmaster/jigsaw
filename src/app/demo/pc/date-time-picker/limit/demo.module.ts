import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerLimitComponent} from './demo.component';
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";
import {JigsawDateTimePickerModule} from "jigsaw/pc-components/date-and-time/date-time-picker";

@NgModule({
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawRadioModule, JigsawDateTimePickerModule],
    declarations: [DateTimePickerLimitComponent],
    exports: [DateTimePickerLimitComponent]
})
export class DateTimePickerLimitDemoModule {
}
