import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
    JigsawButtonBarModule,
    JigsawDateTimePickerModule,
    JigsawDateTimeSelectModule,
    JigsawRangeDateTimePickerModule,
    JigsawRangeDateTimeSelectModule,
    JigsawSwitchModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {DateTimePickerConfirmButtonDemoComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawDateTimePickerModule, JigsawDateTimeSelectModule,
        JigsawRangeDateTimePickerModule, JigsawRangeDateTimeSelectModule, JigsawButtonBarModule
    , JigsawHeaderModule],
    declarations: [DateTimePickerConfirmButtonDemoComponent],
    exports: [DateTimePickerConfirmButtonDemoComponent]
})
export class DateTimePickerConfirmButtonDemoModule {
}
