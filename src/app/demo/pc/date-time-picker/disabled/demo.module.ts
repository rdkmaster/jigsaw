import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
    JigsawButtonBarModule,
    JigsawDatePickerModule,
    JigsawDateTimePickerModule,
    JigsawRangeDateTimePickerModule, JigsawSwitchModule,
    JigsawTimePickerModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerDisabledDemoComponent} from './demo.component';

@NgModule({
    imports: [
        CommonModule, JigsawDateTimePickerModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, JigsawDatePickerModule,
        JigsawTimePickerModule, JigsawRangeDateTimePickerModule, JigsawSwitchModule
    ],
    declarations: [DateTimePickerDisabledDemoComponent],
    exports: [DateTimePickerDisabledDemoComponent]
})
export class DateTimePickerDisabledDemoModule {
}
