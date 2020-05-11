import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawButtonBarModule} from "jigsaw/pc-components/list-and-tile/button-bar";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DatePickerGrComponent} from './demo.component';
import {JigsawDatePickerModule} from "jigsaw/pc-components/date-picker/date-picker";

@NgModule({
    imports: [CommonModule, JigsawDatePickerModule, JigsawDemoDescriptionModule, JigsawButtonBarModule],
    declarations: [DatePickerGrComponent],
    exports: [DatePickerGrComponent]
})
export class DatePickerGrDemoModule {
}
