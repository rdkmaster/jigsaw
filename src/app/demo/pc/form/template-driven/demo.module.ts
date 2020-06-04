import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {
    JigsawInputModule, JigsawCheckBoxModule, JigsawButtonModule, JigsawRadioModule,
    JigsawComboSelectModule, JigsawSelectModule, JigsawTableModule, JigsawSliderModule,
    JigsawSwitchModule, JigsawTileSelectModule, JigsawDateTimePickerModule, JigsawRangeDateTimePickerModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
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
