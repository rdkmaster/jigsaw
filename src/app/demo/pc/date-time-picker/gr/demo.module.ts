import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawButtonBarModule} from "jigsaw/pc-components/list-and-tile/button-bar";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerGrComponent} from './demo.component';
import {JigsawDateTimePickerModule} from "jigsaw/pc-components/date-and-time/date-time-picker";

@NgModule({
    imports: [CommonModule, JigsawDateTimePickerModule, JigsawDemoDescriptionModule, JigsawButtonBarModule],
    declarations: [DateTimePickerGrComponent],
    exports: [DateTimePickerGrComponent]
})
export class DateTimePickerGrDemoModule {
}
