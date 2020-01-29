import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableSetCellRenderDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TableCellSelectRenderer} from "jigsaw/component/table/table-renderer";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select";
import {JigsawListModule} from "jigsaw/component/list-and-tile/list";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {OfficeHeaderRenderer} from "./renderers";

@NgModule({
    imports: [
        JigsawTableModule, CommonModule, JigsawDemoDescriptionModule, JigsawComboSelectModule, JigsawListModule,
        JigsawButtonModule, JigsawCheckBoxModule
    ],
    declarations: [TableSetCellRenderDemoComponent, OfficeHeaderRenderer],
    exports: [TableSetCellRenderDemoComponent],
    entryComponents: [
        TableCellSelectRenderer
    ]
})
export class TableSetCellRenderDemoModule {
}
