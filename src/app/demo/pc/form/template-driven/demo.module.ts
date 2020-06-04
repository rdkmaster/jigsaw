import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {
    JigsawInputModule, JigsawCheckBoxModule, JigsawButtonModule, JigsawRadioModule,
    JigsawComboSelectModule, JigsawRangeTimeModule, JigsawTimeModule,
    JigsawSelectModule, JigsawTableModule, JigsawSliderModule,
    JigsawSwitchModule, JigsawTileSelectModule, JigsawDemoDescriptionModule,
    JigsawDateTimePickerModule, JigsawRangeDateTimePickerModule
} from "jigsaw/public_api";
import {TemplateDrivenDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule, CommonModule,
        JigsawInputModule, JigsawCheckBoxModule, JigsawButtonModule,
        JigsawRadioModule, JigsawComboSelectModule, JigsawRangeDateTimePickerModule,
        JigsawDateTimePickerModule, JigsawSelectModule, JigsawTableModule, JigsawSliderModule,
        JigsawSwitchModule, JigsawTileSelectModule, JigsawDemoDescriptionModule
    ],
    declarations: [TemplateDrivenDemoComponent],
    exports: [TemplateDrivenDemoComponent]
})
export class TemplateDrivenDemoModule {

}
