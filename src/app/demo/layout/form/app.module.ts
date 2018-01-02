import {NgModule} from "@angular/core";
import {FormDemoComponent} from "./app.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawBoxModule} from "jigsaw/component/box/box";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {JigsawInputModule} from "../../../../jigsaw/component/input/input";
import {JigsawRadioModule} from "../../../../jigsaw/component/radio/radio";
import {JigsawComboSelectModule} from "../../../../jigsaw/component/combo-select/index";
import {JigsawTimeModule} from "../../../../jigsaw/component/time/index";
import {JigsawTileSelectModule} from "../../../../jigsaw/component/list-and-tile/tile";
import {JigsawRangeTimeModule} from "../../../../jigsaw/component/range-time/index";
import {JigsawCheckBoxModule} from "../../../../jigsaw/component/checkbox/index";
import {JigsawSliderModule} from "../../../../jigsaw/component/slider/index";
import {JigsawSwitchModule} from "../../../../jigsaw/component/switch/index";
import {JigsawSelectModule} from "../../../../jigsaw/component/select/select";

@NgModule({
    declarations: [FormDemoComponent],
    exports: [FormDemoComponent],
    imports: [
        JigsawBoxModule, FormsModule, ReactiveFormsModule, CommonModule,
        JigsawInputModule, JigsawCheckBoxModule, JigsawButtonModule,
        JigsawRadioModule, JigsawComboSelectModule, JigsawRangeTimeModule,
        JigsawTimeModule, JigsawSliderModule, JigsawSwitchModule,
        JigsawTileSelectModule, JigsawDemoDescriptionModule
    ]
})
export class FormDemoModule {

}
