import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
    JigsawButtonBarModule,
    JigsawDatePickerModule,
    JigsawDateTimePickerModule,
    JigsawRangeDateTimePickerModule,
    JigsawTimePickerModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {DateTimePickerValidDemoComponent} from './demo.component';

@NgModule({
    imports: [
        CommonModule, JigsawDateTimePickerModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, JigsawDatePickerModule,
        JigsawTimePickerModule, JigsawRangeDateTimePickerModule
    ],
    declarations: [DateTimePickerValidDemoComponent],
    exports: [DateTimePickerValidDemoComponent]
})
export class DateTimePickerValidDemoModule {
}
