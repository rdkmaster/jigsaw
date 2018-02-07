import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawSliderModule} from "jigsaw/component/slider/index";
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {JigsawListModule} from "jigsaw/component/list-and-tile/list";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawViewportModule} from "jigsaw/component/viewport/viewport";
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
    exports: [BigTableDataDemoComponent], // 这个是给plunker用的，不能去掉。
    entryComponents: [PositionHeaderRenderer, OfficeHeaderRenderer, OfficeCellRenderer]
})
export class BigTableDataDemoModule {
}
