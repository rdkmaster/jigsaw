import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawSelectModule} from "jigsaw/pc-components/select/select";
import {
    JigsawTableRendererModule, TableCellCheckboxRenderer,
    TableHeadCheckboxRenderer
} from "jigsaw/pc-components/table/table-renderer";
import {JigsawPaginationModule} from "jigsaw/pc-components/pagination/pagination";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {JigsawListModule} from "jigsaw/pc-components/list-and-tile/list";
import {JigsawCheckBoxModule} from "jigsaw/pc-components/checkbox/index";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableRendererDemoComponent} from './demo.component';
import {
    OfficeCellEditorRenderer, OfficeHeaderRenderer, OfficeCellRenderer, PositionHeaderRenderer
} from "./renderers";

@NgModule({
    imports: [
        JigsawTableModule, JigsawSelectModule, JigsawTableRendererModule, JigsawPaginationModule,
        JigsawComboSelectModule, JigsawListModule, JigsawCheckBoxModule, JigsawButtonModule,
        JigsawDemoDescriptionModule
    ],
    declarations: [
        TableRendererDemoComponent, PositionHeaderRenderer, OfficeCellRenderer,
        OfficeCellEditorRenderer, OfficeHeaderRenderer
    ],
    exports: [TableRendererDemoComponent],
    entryComponents: [
        PositionHeaderRenderer, TableCellCheckboxRenderer, TableHeadCheckboxRenderer,
        OfficeCellRenderer, OfficeCellEditorRenderer, OfficeHeaderRenderer
    ]
})
export class TableRendererDemoModule {
}
