import {NgModule} from "@angular/core";
import {DemoTemplateModule} from '../../demo-template/demo-template';
import {JigsawMarkdownModule} from '../../markdown/markdown';
import {FormAllComponent} from "./demo.component";
import {
    JigsawInputModule, JigsawCheckBoxModule, JigsawButtonModule, JigsawRadioModule,
    JigsawComboSelectModule, JigsawSelectModule, JigsawTableModule,
    JigsawSliderModule, JigsawSwitchModule, JigsawTileSelectModule,
    JigsawDateTimePickerModule, JigsawRangeDateTimePickerModule
} from "jigsaw/public_api";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FormBasicDemoComponent} from "./basic/demo.component";



@NgModule({
    declarations: [
        FormAllComponent,
        FormBasicDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawInputModule,
        JigsawCheckBoxModule,
        JigsawButtonModule,
        JigsawRadioModule,
        JigsawComboSelectModule,
        JigsawSelectModule,
        JigsawTableModule,
        JigsawSliderModule,
        JigsawSwitchModule,
        JigsawTileSelectModule,
        JigsawDateTimePickerModule,
        JigsawRangeDateTimePickerModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule

    ]
})
export class FormDemoModule {
}
