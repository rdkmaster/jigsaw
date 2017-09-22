import {NgModule} from '@angular/core';
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {
    JigsawTableRendererModule, TableCellCheckboxRenderer,
    TableHeadCheckboxRenderer
} from "jigsaw/component/table/table-renderer";
import {JigsawPaginationModule} from "jigsaw/component/pagination/pagination";
import {TableRendererDemoComponent} from './app.component';
import {TableCellOperation, TableHeadIcon, TableHeadSelect} from "./table-renderer";

@NgModule({
    imports: [JigsawTableModule, JigsawSelectModule, JigsawTableRendererModule, JigsawPaginationModule],
    declarations: [TableRendererDemoComponent, TableHeadSelect, TableHeadIcon, TableCellOperation],
    bootstrap: [TableRendererDemoComponent], // 这个是给plunker用的，不能去掉。
    entryComponents: [
        TableHeadSelect, TableHeadIcon, TableCellOperation, TableCellCheckboxRenderer, TableHeadCheckboxRenderer
    ]
})
export class TableRendererDemoModule {
}
