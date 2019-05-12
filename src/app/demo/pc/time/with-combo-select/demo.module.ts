import {NgModule} from '@angular/core';
import {JigsawTimeModule} from "jigsaw/pc-components/time/index";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {JigsawRangeTimeModule} from "jigsaw/pc-components/range-time/index";
import {ComboSelectDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTimeModule, JigsawComboSelectModule, JigsawRangeTimeModule, JigsawDemoDescriptionModule],
    declarations: [ComboSelectDemoComponent],
    exports: [ComboSelectDemoComponent]
})
export class TimeComboDemoModule {
}
