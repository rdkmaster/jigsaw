import {NgModule} from '@angular/core';
import {JigsawComboSelectModule, JigsawRangeDateTimePickerModule} from "jigsaw/public_api";
import {RangeDateTimeComboSelectDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawComboSelectModule, JigsawDemoDescriptionModule, JigsawRangeDateTimePickerModule],
    declarations: [RangeDateTimeComboSelectDemoComponent],
    exports: [RangeDateTimeComboSelectDemoComponent]
})
export class RangeDateTimeComboDemoModule {
}
