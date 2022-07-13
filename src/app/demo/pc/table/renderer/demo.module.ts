import {NgModule} from '@angular/core';
import {
    JigsawTableModule, JigsawSelectModule, JigsawTableRendererModule, TableCellCheckboxRenderer,
    TableHeadCheckboxRenderer, JigsawPaginationModule, JigsawComboSelectModule,
    JigsawListModule, JigsawCheckBoxModule, JigsawButtonModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableRendererDemoComponent} from './demo.component';
import {
    OfficeCellEditorRenderer, OfficeHeaderRenderer, OfficeCellRenderer, PositionHeaderRenderer
} from "./renderers";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        JigsawTableModule, JigsawSelectModule, JigsawTableRendererModule, JigsawPaginationModule,
        JigsawComboSelectModule, JigsawListModule, JigsawCheckBoxModule, JigsawButtonModule,
        JigsawDemoDescriptionModule, DemoTemplateModule
    ],
    declarations: [
        TableRendererDemoComponent, PositionHeaderRenderer, OfficeCellRenderer,
        OfficeCellEditorRenderer, OfficeHeaderRenderer
    ],
    exports: [TableRendererDemoComponent]
})
export class TableRendererDemoModule {
}
