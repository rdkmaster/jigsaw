import {NgModule} from '@angular/core';
import {
    JigsawTableModule, JigsawSliderModule, JigsawSelectModule, JigsawComboSelectModule,
    JigsawListModule, JigsawButtonModule, JigsawCheckBoxModule,
    JigsawViewportModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BigTableDataDemoComponent} from './demo.component';
import {OfficeCellRenderer, OfficeHeaderRenderer, PositionHeaderRenderer} from "./renderers";

@NgModule({
    imports: [
        JigsawTableModule, JigsawSliderModule, JigsawDemoDescriptionModule, JigsawSelectModule, JigsawComboSelectModule,
        JigsawListModule, JigsawButtonModule, JigsawCheckBoxModule, JigsawViewportModule
    ],
    declarations: [
        BigTableDataDemoComponent, PositionHeaderRenderer, OfficeHeaderRenderer, OfficeCellRenderer
    ],
    exports: [BigTableDataDemoComponent],
    entryComponents: [PositionHeaderRenderer, OfficeHeaderRenderer, OfficeCellRenderer]
})
export class BigTableDataDemoModule {
}
