import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawDateTimePickerModule, JigsawRadioModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {DateTimePickerLimitComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawRadioModule, JigsawDateTimePickerModule, JigsawSwitchModule, JigsawHeaderModule],
    declarations: [DateTimePickerLimitComponent],
    exports: [DateTimePickerLimitComponent]
})
export class DateTimePickerLimitDemoModule {
}
