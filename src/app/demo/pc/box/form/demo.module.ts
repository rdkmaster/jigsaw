import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {JigsawTileSelectModule} from "jigsaw/pc-components/list-and-tile/tile";
import {JigsawCheckBoxModule} from "jigsaw/pc-components/checkbox/index";
import {JigsawSliderModule} from "jigsaw/pc-components/slider/index";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch/index";
import {JigsawBoxModule} from "jigsaw/pc-components/box/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {FormDemoComponent} from "./demo.component";
import {JigsawDateTimePickerModule} from "jigsaw/pc-components/date-and-time/date-time-picker";
import {JigsawRangeDateTimePickerModule} from "jigsaw/pc-components/date-and-time/range-date-time-picker";

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
