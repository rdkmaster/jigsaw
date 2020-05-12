import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DatePickerLimitComponent} from './demo.component';
import {JigsawDatePickerModule} from "jigsaw/pc-components/date-picker/date-picker";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";

@NgModule({
    imports: [CommonModule, JigsawDatePickerModule, JigsawDemoDescriptionModule, JigsawRadioModule],
    declarations: [DatePickerLimitComponent],
    exports: [DatePickerLimitComponent]
})
export class DatePickerLimitDemoModule {
}
