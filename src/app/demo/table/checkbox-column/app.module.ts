import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/component/table/table-renderer";
import {TableAddCheckboxColumnDemoComponent} from './app.component';
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    imports: [JigsawTableModule, JigsawDemoDescriptionModule],
    declarations: [TableAddCheckboxColumnDemoComponent],
    exports: [TableAddCheckboxColumnDemoComponent],
    entryComponents: [TableCellCheckboxRenderer, TableHeadCheckboxRenderer]
})
export class TableAddCheckboxColumnDemoModule {
}
