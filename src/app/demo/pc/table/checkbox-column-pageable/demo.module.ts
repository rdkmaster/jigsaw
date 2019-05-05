import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/pc-components/table/table-renderer";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawPaginationModule} from "jigsaw/pc-components/pagination/pagination";
import {JigsawTagModule} from "jigsaw/pc-components/tag/tag";
import {TableAddCheckboxColumnPageableDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawTagModule, JigsawDemoDescriptionModule, CommonModule],
    declarations: [TableAddCheckboxColumnPageableDemoComponent],
    exports: [TableAddCheckboxColumnPageableDemoComponent],
    entryComponents: [TableCellCheckboxRenderer, TableHeadCheckboxRenderer]
})
export class TableAddCheckboxColumnPageableDemoModule {
}
