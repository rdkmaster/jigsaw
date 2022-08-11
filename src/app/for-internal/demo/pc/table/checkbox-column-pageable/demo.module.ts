import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
    JigsawTableModule, TableCellCheckboxRenderer, TableHeadCheckboxRenderer, JigsawPaginationModule,
    JigsawTagModule, JigsawButtonModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TableAddCheckboxColumnPageableDemoComponent} from './demo.component';

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawTagModule, JigsawDemoDescriptionModule, CommonModule, JigsawButtonModule, JigsawHeaderModule],
    declarations: [TableAddCheckboxColumnPageableDemoComponent],
    exports: [TableAddCheckboxColumnPageableDemoComponent]
})
export class TableAddCheckboxColumnPageableDemoModule {
}
