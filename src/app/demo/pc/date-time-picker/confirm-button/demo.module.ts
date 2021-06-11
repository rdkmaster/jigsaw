import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
    JigsawDateTimePickerModule,
    JigsawDateTimeSelectModule,
    JigsawRangeDateTimePickerModule,
    JigsawRangeDateTimeSelectModule,
    JigsawSwitchModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerConfirmButtonDemoComponent} from './demo.component';

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawSwitchModule, JigsawDateTimePickerModule, JigsawDateTimeSelectModule,
        JigsawRangeDateTimePickerModule, JigsawRangeDateTimeSelectModule
    ],
    declarations: [DateTimePickerConfirmButtonDemoComponent],
    exports: [DateTimePickerConfirmButtonDemoComponent]
})
export class DateTimePickerConfirmButtonDemoModule {
}
