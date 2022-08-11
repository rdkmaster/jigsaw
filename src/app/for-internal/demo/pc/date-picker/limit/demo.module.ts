import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawDatePickerModule, JigsawRadioModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DatePickerLimitComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [CommonModule, JigsawDatePickerModule, JigsawDemoDescriptionModule, JigsawRadioModule, JigsawHeaderModule],
    declarations: [DatePickerLimitComponent],
    exports: [DatePickerLimitComponent]
})
export class DatePickerLimitDemoModule {
}
