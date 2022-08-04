import {NgModule} from "@angular/core";
import {DemoTemplateModule} from '../../../demo/demo-template/demo-template';
import {JigsawMarkdownModule} from '../../../markdown/markdown';
import {
    JigsawButtonModule, JigsawInputModule, JigsawRadioModule, JigsawComboSelectModule,
    JigsawTileSelectModule, JigsawCheckBoxModule, JigsawSliderModule,
    JigsawSwitchModule, JigsawBoxModule, JigsawDateTimePickerModule,
    JigsawRangeDateTimePickerModule
} from "jigsaw/public_api";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BoxAllComponent} from "./demo.component";
import {FormDemoComponent} from "./form/demo.component";
import {BoxJustifyDemoComponent} from "./justify/demo.component";
import {BoxLayoutDemoComponent} from "./layout/demo.component";
import {BoxMiddleResizeLineDemoComponent} from "./middle-resize-line/demo.component";


@NgModule({
    declarations: [
        BoxAllComponent,
        FormDemoComponent,
        BoxJustifyDemoComponent,
        BoxLayoutDemoComponent,
        BoxMiddleResizeLineDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawButtonModule,
        JigsawInputModule,
        JigsawRadioModule,
        JigsawComboSelectModule,
        JigsawTileSelectModule,
        JigsawCheckBoxModule,
        JigsawSliderModule,
        JigsawSwitchModule,
        JigsawBoxModule,
        JigsawDateTimePickerModule,
        JigsawRangeDateTimePickerModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule

    ]
})
export class BoxDemoModule {
}