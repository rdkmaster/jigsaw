import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/component/table/table-renderer";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawPaginationModule} from "jigsaw/component/pagination/pagination";
import {JigsawTagModule} from "jigsaw/component/tag/tag";
import {TableAddCheckboxColumnPageableDemoComponent} from './demo.component';

@NgModule({
    imports: [JigsawTableModule, JigsawPaginationModule, JigsawTagModule, JigsawDemoDescriptionModule, CommonModule],
    declarations: [TableAddCheckboxColumnPageableDemoComponent],
    exports: [TableAddCheckboxColumnPageableDemoComponent],
    entryComponents: [TableCellCheckboxRenderer, TableHeadCheckboxRenderer]
})
export class TableAddCheckboxColumnPageableDemoModule {
}
