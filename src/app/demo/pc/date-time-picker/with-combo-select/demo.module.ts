import {NgModule} from '@angular/core';
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {WithComboSelectDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawDateTimePickerModule} from "jigsaw/pc-components/date-and-time/date-time-picker";

@NgModule({
    imports: [JigsawDateTimePickerModule, JigsawComboSelectModule, JigsawDemoDescriptionModule],
    declarations: [WithComboSelectDemoComponent],
    exports: [WithComboSelectDemoComponent]
})
export class WithComboSelectDemoModule {
}
