import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawButtonBarModule, JigsawDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DateTimePickerWeekStartComponent} from './demo.component';

@NgModule({
    imports: [CommonModule, JigsawDateTimePickerModule, JigsawDemoDescriptionModule, JigsawButtonBarModule],
    declarations: [DateTimePickerWeekStartComponent],
    exports: [DateTimePickerWeekStartComponent]
})
export class DateTimePickerWeekStartDemoModule {
}
