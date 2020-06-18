import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawDatePickerModule, JigsawRadioModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DatePickerLimitComponent} from './demo.component';

@NgModule({
    imports: [CommonModule, JigsawDatePickerModule, JigsawDemoDescriptionModule, JigsawRadioModule],
    declarations: [DatePickerLimitComponent],
    exports: [DatePickerLimitComponent]
})
export class DatePickerLimitDemoModule {
}
