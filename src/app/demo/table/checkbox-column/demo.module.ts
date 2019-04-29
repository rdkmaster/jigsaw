import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/pc-components/table/table-renderer";
import {TableAddCheckboxColumnDemoComponent} from './demo.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableAddCheckboxColumnDemoComponent],
    exports: [TableAddCheckboxColumnDemoComponent],
    entryComponents: [TableCellCheckboxRenderer, TableHeadCheckboxRenderer]
})
export class TableAddCheckboxColumnDemoModule {
}
