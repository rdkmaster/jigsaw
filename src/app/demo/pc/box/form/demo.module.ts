import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {
    JigsawButtonModule, JigsawInputModule, JigsawRadioModule, JigsawComboSelectModule,
    JigsawTileSelectModule, JigsawCheckBoxModule, JigsawSliderModule,
    JigsawSwitchModule, JigsawBoxModule, JigsawDateTimePickerModule,
    JigsawRangeDateTimePickerModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {FormDemoComponent} from "./demo.component";

@NgModule({
    declarations: [FormDemoComponent],
    exports: [FormDemoComponent],
    imports: [
        JigsawBoxModule, FormsModule, ReactiveFormsModule, CommonModule,
        JigsawInputModule, JigsawCheckBoxModule, JigsawButtonModule,
        JigsawRadioModule, JigsawComboSelectModule, JigsawRangeDateTimePickerModule,
        JigsawDateTimePickerModule, JigsawSliderModule, JigsawSwitchModule,
        JigsawTileSelectModule, JigsawDemoDescriptionModule
    ]
})
export class FormDemoModule {
}
