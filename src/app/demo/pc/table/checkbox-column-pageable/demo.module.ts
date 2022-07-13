import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
    JigsawTableModule, TableCellCheckboxRenderer, TableHeadCheckboxRenderer, JigsawPaginationModule,
    JigsawTagModule, JigsawButtonModule
} from "jigsaw/public_api";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {TableAddCheckboxColumnPageableDemoComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawTagModule, DemoTemplateModule, CommonModule, JigsawButtonModule, JigsawHeaderModule],
    declarations: [TableAddCheckboxColumnPageableDemoComponent],
    exports: [TableAddCheckboxColumnPageableDemoComponent]
})
export class TableAddCheckboxColumnPageableDemoModule {
}
