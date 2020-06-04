import {NgModule} from '@angular/core';
import {JigsawComboSelectModule, JigsawDateTimePickerModule} from "jigsaw/public_api";
import {WithComboSelectDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawDateTimePickerModule, JigsawComboSelectModule, JigsawDemoDescriptionModule],
    declarations: [WithComboSelectDemoComponent],
    exports: [WithComboSelectDemoComponent]
})
export class WithComboSelectDemoModule {
}
