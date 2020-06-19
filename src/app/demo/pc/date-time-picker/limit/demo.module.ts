import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawRadioModule, JigsawDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerLimitComponent} from './demo.component';

@NgModule({
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawRadioModule, JigsawDateTimePickerModule],
    declarations: [DateTimePickerLimitComponent],
    exports: [DateTimePickerLimitComponent]
})
export class DateTimePickerLimitDemoModule {
}
