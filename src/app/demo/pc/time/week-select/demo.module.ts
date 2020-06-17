import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTimeModule, JigsawComboSelectModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {TimeWeekSelectComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawTimeModule, JigsawButtonBarModule, JigsawComboSelectModule, JigsawDemoDescriptionModule],
    declarations: [TimeWeekSelectComponent],
    exports: [TimeWeekSelectComponent]
})
export class TimeWeekSelectDemoModule {
}
