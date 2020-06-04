import {NgModule} from '@angular/core';
import {JigsawTimeModule, JigsawComboSelectModule, JigsawRangeTimeModule} from "jigsaw/public_api";
import {ComboSelectDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTimeModule, JigsawComboSelectModule, JigsawRangeTimeModule, JigsawDemoDescriptionModule],
    declarations: [ComboSelectDemoComponent],
    exports: [ComboSelectDemoComponent]
})
export class TimeComboDemoModule {
}
