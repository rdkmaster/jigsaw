import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawButtonBarModule, JigsawDateTimePickerModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DateTimePickerGrComponent} from './demo.component';
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [CommonModule, JigsawDateTimePickerModule, JigsawDemoDescriptionModule, JigsawButtonBarModule, DemoTemplateModule],
    declarations: [DateTimePickerGrComponent],
    exports: [DateTimePickerGrComponent]
})
export class DateTimePickerGrDemoModule {
}
