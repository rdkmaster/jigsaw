import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawButtonBarModule, JigsawDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerGrComponent} from './demo.component';

@NgModule({
    imports: [CommonModule, JigsawDateTimePickerModule, JigsawDemoDescriptionModule, JigsawButtonBarModule],
    declarations: [DateTimePickerGrComponent],
    exports: [DateTimePickerGrComponent]
})
export class DateTimePickerGrDemoModule {
}
