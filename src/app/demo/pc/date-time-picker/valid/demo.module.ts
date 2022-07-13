import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
    JigsawButtonBarModule,
    JigsawDatePickerModule,
    JigsawDateTimePickerModule,
    JigsawRangeDateTimePickerModule,
    JigsawTimePickerModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerValidDemoComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        CommonModule, JigsawDateTimePickerModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, JigsawDatePickerModule,
        JigsawTimePickerModule, JigsawRangeDateTimePickerModule, DemoTemplateModule
    ],
    declarations: [DateTimePickerValidDemoComponent],
    exports: [DateTimePickerValidDemoComponent]
})
export class DateTimePickerValidDemoModule {
}
