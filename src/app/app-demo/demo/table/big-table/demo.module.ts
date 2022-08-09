import {NgModule} from '@angular/core';
import {
    JigsawTableModule, JigsawSliderModule, JigsawSelectModule, JigsawComboSelectModule,
    JigsawListModule, JigsawButtonModule, JigsawCheckBoxModule,
    JigsawViewportModule
} from "jigsaw/public_api";
import {BigTableDataDemoComponent} from './demo.component';
import {OfficeCellRenderer, OfficeHeaderRenderer, PositionHeaderRenderer} from "./renderers";
import {DemoTemplateModule} from "../../demo-template/demo-template";

@NgModule({
    imports: [
        JigsawTableModule, JigsawSliderModule, JigsawSelectModule, JigsawComboSelectModule,
        JigsawListModule, JigsawButtonModule, JigsawCheckBoxModule, JigsawViewportModule, DemoTemplateModule
    ],
    declarations: [
        BigTableDataDemoComponent, PositionHeaderRenderer, OfficeHeaderRenderer, OfficeCellRenderer
    ],
    exports: [BigTableDataDemoComponent]
})
export class BigTableDataDemoModule {
}
