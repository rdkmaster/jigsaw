import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawSliderModule} from "jigsaw/pc-components/slider/index";
import {JigsawSelectModule} from "jigsaw/pc-components/select/select";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {JigsawListModule} from "jigsaw/pc-components/list-and-tile/list";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawCheckBoxModule} from "jigsaw/pc-components/checkbox/index";
import {JigsawViewportModule} from "jigsaw/pc-components/viewport/viewport";
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
