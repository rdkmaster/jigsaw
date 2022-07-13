import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawDateTimePickerModule, JigsawRadioModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerLimitComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawRadioModule, JigsawDateTimePickerModule, JigsawSwitchModule, JigsawHeaderModule, DemoTemplateModule],
    declarations: [DateTimePickerLimitComponent],
    exports: [DateTimePickerLimitComponent]
})
export class DateTimePickerLimitDemoModule {
}
