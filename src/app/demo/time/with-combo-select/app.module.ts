import {NgModule} from '@angular/core';
import {JigsawTimeModule} from "jigsaw/component/time/index";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {ComboSelectDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTimeModule, JigsawComboSelectModule, JigsawRangeTimeModule, JigsawDemoDescriptionModule],
    declarations: [ComboSelectDemoComponent],
    bootstrap: [ComboSelectDemoComponent]
})
export class TimeComboDemoModule {
}
