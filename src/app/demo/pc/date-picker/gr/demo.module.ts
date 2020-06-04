import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawButtonBarModule, JigsawDatePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DatePickerGrComponent} from './demo.component';

@NgModule({
    imports: [CommonModule, JigsawDatePickerModule, JigsawDemoDescriptionModule, JigsawButtonBarModule],
    declarations: [DatePickerGrComponent],
    exports: [DatePickerGrComponent]
})
export class DatePickerGrDemoModule {
}
