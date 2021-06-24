import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawDateTimePickerModule, JigsawRadioModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerLimitComponent} from './demo.component';

@NgModule({
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawRadioModule, JigsawDateTimePickerModule, JigsawSwitchModule],
    declarations: [DateTimePickerLimitComponent],
    exports: [DateTimePickerLimitComponent]
})
export class DateTimePickerLimitDemoModule {
}
