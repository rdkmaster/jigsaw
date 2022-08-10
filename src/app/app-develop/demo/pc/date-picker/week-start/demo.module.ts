import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawButtonBarModule, JigsawDatePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {DatePickerWeekStartComponent} from './demo.component';

@NgModule({
    imports: [CommonModule, JigsawDatePickerModule, JigsawDemoDescriptionModule, JigsawButtonBarModule],
    declarations: [DatePickerWeekStartComponent],
    exports: [DatePickerWeekStartComponent]
})
export class DatePickerWeekStartDemoModule {
}
