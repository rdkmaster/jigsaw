import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawButtonBarModule, JigsawDatePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DatePickerWeekStartComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [CommonModule, JigsawDatePickerModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, DemoTemplateModule],
    declarations: [DatePickerWeekStartComponent],
    exports: [DatePickerWeekStartComponent]
})
export class DatePickerWeekStartDemoModule {
}
