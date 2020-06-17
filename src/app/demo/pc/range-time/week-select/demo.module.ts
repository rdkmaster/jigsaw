import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawRangeTimeModule, JigsawComboSelectModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {RangeTimeWeekSelectComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawRangeTimeModule, JigsawButtonBarModule, JigsawComboSelectModule, JigsawDemoDescriptionModule],
    declarations: [RangeTimeWeekSelectComponent],
    exports: [RangeTimeWeekSelectComponent]
})
export class RangeTimeWeekSelectDemoModule {
}
