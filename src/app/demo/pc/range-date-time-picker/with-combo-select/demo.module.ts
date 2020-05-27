import {NgModule} from '@angular/core';
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {RangeDateTimeComboSelectDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawRangeDateTimePickerModule} from "jigsaw/pc-components/date-and-time/range-date-time-picker";

@NgModule({
    imports: [JigsawComboSelectModule, JigsawDemoDescriptionModule, JigsawRangeDateTimePickerModule],
    declarations: [RangeDateTimeComboSelectDemoComponent],
    exports: [RangeDateTimeComboSelectDemoComponent]
})
export class RangeDateTimeComboDemoModule {
}
